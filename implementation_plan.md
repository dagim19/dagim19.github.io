# Anonymous User Data Ingestion & Enhanced Ad Analytics

## Problem Statement

Channel 1 Ethiopia is an **ad-funded** app — ad revenue is the business model. The current architecture requires users to **register/login** (Better Auth) before any meaningful data is captured. This creates two critical problems:

1. **Friction kills data** — Most users will never sign up. Every registration wall reduces your audience insight by 60-80%. For an ad-funded app in Ethiopia (diaspora + domestic), the signup barrier means you're blind to the majority of your actual users.
2. **No anonymous profile = no targeting foundation** — The `ad_campaigns.targeting` JSONB field exists in the schema but has zero data to power it. Future targeted ads require behavioral data that starts accumulating **before** login.

## Core Design Decision: Anonymous-First Identity

> [!IMPORTANT]
> **The key insight**: Every app install gets a persistent `anonymous_id` (UUID) generated client-side and stored in `expo-secure-store`. This ID anchors ALL behavioral data. If/when the user later signs up, we **merge** the anonymous profile into the authenticated one — preserving the full history.

This is the industry-standard pattern used by Segment, PostHog, Mixpanel, and Amplitude. We're building it self-hosted (no third-party SDKs), consistent with the architecture's self-hosted philosophy.

```
    ┌─────────────────────────────────────────────────────┐
    │  APP INSTALL (Day 0)                                │
    │  → Generate anonymous_id (UUID)                     │
    │  → Store in expo-secure-store (persists reinstalls) │
    │  → Collect: device info, OS, app version            │
    │  → Begin tracking: views, watch time, ad events     │
    └───────────────────┬─────────────────────────────────┘
                        │
    ┌───────────────────▼─────────────────────────────────┐
    │  ANONYMOUS USAGE (Days 0 → N)                       │
    │  All events tagged with anonymous_id + session_id   │
    │  → Content preferences emerge (categories watched)  │
    │  → Watch patterns emerge (time of day, duration)    │
    │  → Ad interactions tracked per anonymous profile    │
    │  → Device fingerprint: OS, model, screen, locale    │
    └───────────────────┬─────────────────────────────────┘
                        │
    ┌───────────────────▼─────────────────────────────────┐
    │  USER SIGNS UP (Day N) — Optional!                  │
    │  → API receives: { anonymous_id, user_id }          │
    │  → MERGE: all anonymous events → user_id            │
    │  → anonymous_devices row linked to user             │
    │  → Historical behavioral data preserved             │
    │  → Progressive profiling begins                     │
    └─────────────────────────────────────────────────────┘
```

---

## User Review Required

> [!IMPORTANT]
> **Privacy Policy**: Ethiopia doesn't have a comprehensive data protection law equivalent to GDPR yet, but Google Play and Apple App Store **do** enforce privacy requirements. We need a privacy policy page that discloses what anonymous data we collect. This is a content/legal task, not engineering — but it must happen before app store submission.

> [!WARNING]
> **expo-tracking-transparency**: On iOS, if we ever want to use the IDFA (Advertising Identifier) for cross-app tracking, we MUST show the App Tracking Transparency (ATT) prompt. For **this phase**, we are NOT using IDFA — we use our own self-generated anonymous ID, which does NOT require ATT. However, if future requirements include third-party ad network integration, ATT will be required.

---

## Open Questions

1. **Data retention period for anonymous profiles**: How long should we keep anonymous user data that never converts to a registered user? Recommendation: **90 days of raw events**, aggregate data kept indefinitely.
2. **Admin dashboard scope**: Should the new analytics insights be a new dedicated tab in the existing Ads Manager, or a completely separate "Audience Insights" page in the admin sidebar? Recommendation: **New "Audience Insights" page** — it's broader than just ads.
3. **Consent banner**: Do you want a minimal "We collect anonymous usage data to improve your experience" notice on first launch, or skip it since we're not using IDFA/GAID? Recommendation: **Show a brief, non-blocking notice** — builds trust and covers future compliance needs.

---

## Proposed Changes

### Component 1: Shared Package (`packages/shared`)

Foundational types, constants, and validators that both mobile and API consume.

#### [MODIFY] [common.types.ts](file:///c:/Users/dagim/channel1-ethiopia/packages/shared/src/types/common.types.ts)

- Add `DeviceFingerprint` interface (extends existing `DeviceInfo` with locale, timezone, screen density, carrier info)
- Add `AnonymousIdentity` type

#### [NEW] `audience.types.ts`

New types file for the anonymous user / audience system:
- `AnonymousDevice` — maps to new `anonymous_devices` DB table
- `AnonymousProfile` — computed audience profile (content preferences, watch patterns)
- `AudienceSegment` — named segments for admin dashboard (e.g., "Sports fans", "Prime-time viewers")
- `AudienceInsightsResponse` — admin dashboard API response type
- `DeviceRegistrationDTO` — payload when a device first contacts the API
- `IdentityMergeDTO` — payload when anonymous → authenticated merge occurs

#### [MODIFY] [cache.constants.ts](file:///c:/Users/dagim/channel1-ethiopia/packages/shared/src/constants/cache.constants.ts)

- Add cache keys for: `anonymousDevice:{anonymousId}`, `audienceSegments`, `deviceSession:{anonymousId}`
- Add TTL constants for anonymous device cache (24h), audience segments (10min)

#### [MODIFY] [api.constants.ts](file:///c:/Users/dagim/channel1-ethiopia/packages/shared/src/constants/api.constants.ts)

- Add public route: `POST /api/v1/devices/register` — anonymous device registration
- Add public route: `POST /api/v1/events/track` — event ingestion (replaces reliance on user-scoped analytics)
- Add public route: `POST /api/v1/events/batch` — batch event ingestion
- Add admin route: `GET /api/v1/admin/analytics/audience` — audience insights dashboard

---

### Component 2: API — Database Schema (`apps/api/src/db/schema`)

#### [NEW] `anonymous-devices.ts`

New Drizzle schema for the `anonymous_devices` table:
```sql
anonymous_devices (
  id              UUID PK DEFAULT gen_random_uuid(),
  anonymous_id    VARCHAR(100) UNIQUE NOT NULL,  -- Client-generated UUID
  user_id         UUID REFERENCES user(id),      -- NULL until login merge
  device_model    VARCHAR(100),
  os              VARCHAR(20),                   -- 'ios' | 'android'
  os_version      VARCHAR(20),
  app_version     VARCHAR(20),
  locale          VARCHAR(10),                   -- 'am-ET', 'en-US'
  timezone        VARCHAR(50),
  screen_width    INTEGER,
  screen_height   INTEGER,
  first_seen_at   TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at    TIMESTAMPTZ DEFAULT NOW(),
  merged_at       TIMESTAMPTZ,                   -- When linked to user
  metadata        JSONB DEFAULT '{}'
)
```
- Index on `anonymous_id` (unique)
- Index on `user_id` (for lookup after merge)
- Index on `last_seen_at` (for cleanup of stale devices)

#### [MODIFY] [analytics.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/api/src/db/schema/analytics.ts)

- Add `anonymousId` column (`VARCHAR(100)`, nullable) — allows events from non-authenticated users
- Add index on `(anonymous_id, event_type, created_at)` for anonymous user queries

#### [MODIFY] [sponsors.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/api/src/db/schema/sponsors.ts) — `ad_events` table

- Add `anonymousId` column (`VARCHAR(100)`, nullable) — ad events from anonymous users
- Add index on `(anonymous_id, event_type, created_at)`

#### [MODIFY] [index.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/api/src/db/schema/index.ts)

- Export the new `anonymous-devices` schema

---

### Component 3: API — New Modules (`apps/api/src/modules`)

#### [NEW] `devices/` module

New module for anonymous device management:

- **`devices.service.ts`** — Business logic:
  - `registerDevice(dto)` — Upserts device record, returns `anonymous_id`
  - `mergeIdentity(anonymousId, userId)` — Links device to user, migrates all `analytics_events` and `ad_events` from `anonymous_id` to `user_id` in a single transaction
  - `getDeviceByAnonymousId(id)` — Lookup
  - `updateLastSeen(anonymousId)` — Touch timestamp on every API call
  
- **`devices.route.ts`** — Public route (no auth required):
  - `POST /api/v1/devices/register` — Called on first app launch
  - Body: `{ anonymousId, deviceModel, os, osVersion, appVersion, locale, timezone, screenWidth, screenHeight }`
  - Returns: `{ data: { anonymousId, firstSeen } }`

#### [NEW] `events/` module

Enhanced event ingestion that works for BOTH anonymous and authenticated users:

- **`events.service.ts`** — Business logic:
  - `trackEvent(dto)` — Insert into `analytics_events` with either `userId` or `anonymousId`
  - `trackBatch(events[])` — Bulk insert (up to 50 events per batch, batched on mobile to reduce requests)
  - Validates event types against the shared `AnalyticsEventType` enum
  
- **`events.route.ts`** — Public routes (no auth required):
  - `POST /api/v1/events/track` — Single event
  - `POST /api/v1/events/batch` — Batch events (mobile buffers and sends every 30s or on app background)
  - Body includes `anonymousId` (always) + `userId` (if authenticated)

#### [MODIFY] `analytics/` module

Enhance the existing analytics service with audience insights:

- **[NEW] `audience-analytics.service.ts`** — Audience insights aggregations:
  - `getAudienceOverview()` — Total devices, anonymous vs. authenticated, device/OS/locale breakdown, daily active devices
  - `getContentAffinityMap()` — What categories/programs anonymous users watch most (powers future targeting)
  - `getWatchPatterns()` — Time-of-day heatmap, average session duration by device type
  - `getAnonymousAdMetrics()` — Ad performance segmented by anonymous audience cohorts
  - `getConversionFunnel()` — Install → First video → Return visit → Registration conversion rates

- **[NEW] `audience-analytics.admin.route.ts`** — Admin route:
  - `GET /api/v1/admin/analytics/audience` — Full audience insights response

---

### Component 4: API — Identity Merge (`apps/api/src/modules/auth`)

#### [MODIFY] [auth.route.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/api/src/modules/auth/auth.route.ts)

- After successful sign-up or sign-in, if the request includes `anonymousId` in the body:
  - Call `devicesService.mergeIdentity(anonymousId, userId)` 
  - This runs a **transaction** that:
    1. Updates `anonymous_devices.user_id` and sets `merged_at`
    2. Updates all `analytics_events` where `anonymous_id = X AND user_id IS NULL` → set `user_id`
    3. Updates all `ad_events` where `anonymous_id = X AND user_id IS NULL` → set `user_id`
  - This preserves the full anonymous history under the authenticated user

---

### Component 5: Mobile App (`apps/mobile`)

#### [NEW] `services/device-identity.ts`

Core identity service:
- On app launch: check `expo-secure-store` for existing `anonymous_id`
- If none: generate UUID v4, store it, call `POST /api/v1/devices/register`
- Expose `getAnonymousId()` for all services to use
- Collect device info via `expo-device` and `expo-application`:
  - `Device.modelName`, `Device.osName`, `Device.osVersion`
  - `Application.nativeApplicationVersion`
  - `Localization.locale`, `Localization.timezone`
  - Screen dimensions from `Dimensions` API

#### [NEW] `services/event-tracker.ts`

Enhanced analytics tracker replacing ad-hoc tracking:
- Buffers events in memory (max 50 or 30 seconds, whichever comes first)
- Flushes batch to `POST /api/v1/events/batch` 
- Automatically attaches `anonymousId` + `userId` (if logged in) + `sessionId` + `deviceInfo`
- Hooks into `AppState` changes to flush on background/close
- Event types: all from shared `AnalyticsEventType` enum
- Fire-and-forget pattern (non-blocking, errors silently logged)

#### [MODIFY] [_layout.tsx](file:///c:/Users/dagim/channel1-ethiopia/apps/mobile/app/_layout.tsx)

- Initialize `DeviceIdentity` service on mount (before auth hydration)
- Initialize `EventTracker` with the anonymous ID
- Track `app_open` event on launch
- Track `app_background` / `app_close` on `AppState` changes

#### [MODIFY] [auth.store.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/mobile/stores/auth.store.ts)

- On `signIn` / `signUp` success: send `anonymousId` in the auth request body
- This triggers the server-side identity merge

#### [MODIFY] [auth.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/mobile/services/auth.ts) (mobile service)

- Include `anonymousId` in the sign-up and sign-in request bodies
- The backend auth route uses this to trigger the merge

#### [MODIFY] [ads.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/mobile/services/ads.ts)

- Include `anonymousId` in ad event tracking payloads
- Include `anonymousId` as query param when fetching ads (enables frequency capping for anonymous users)

#### [MODIFY] Various screen files

- Add `screen_view` event tracking to key screens (home, schedule, library, live, program detail, video player)
- Add `video_play`, `video_complete`, `video_pause` events to player hooks
- Add `search` event to search screen
- Add `share` event to share actions

---

### Component 6: Admin Dashboard (`apps/admin`)

#### [NEW] `app/(admin)/audience/page.tsx`

New "Audience Insights" page in the admin panel:

**KPI Cards Row:**
- Total Devices (anonymous + authenticated)
- Anonymous vs. Registered ratio  
- Daily Active Devices (last 7 days trend)
- Avg. Session Duration
- Registration Conversion Rate

**Charts Section:**
- **Device/OS Breakdown** — Pie chart (iOS vs Android, with OS version distribution)
- **Content Affinity** — Horizontal bar chart showing top categories/programs by watch time
- **Watch Time Heatmap** — 7×24 grid showing peak usage hours by day of week
- **Geographic/Locale Distribution** — Bar chart of user locales (am-ET, en-US, etc.)
- **Conversion Funnel** — Funnel visualization: Install → First Watch → Return → Signup

**Anonymous Ad Performance Section:**
- Ad impressions/clicks from anonymous vs. authenticated users
- Anonymous audience size eligible for targeting (by content preference)

#### [MODIFY] [admin-shell.tsx](file:///c:/Users/dagim/channel1-ethiopia/apps/admin/components/admin-shell.tsx)

- Add "Audience" navigation item in the sidebar (with a Users/Target icon)

#### [NEW] `components/audience/` directory

- `audience-overview.tsx` — KPI cards component  
- `device-breakdown-chart.tsx` — OS/device chart
- `content-affinity-chart.tsx` — Category watch time chart
- `watch-heatmap.tsx` — Time-of-day heatmap
- `conversion-funnel.tsx` — Funnel visualization
- Use Recharts (already likely available in admin panel dependencies) for all charts

---

### Component 7: API Route Registration (`apps/api/src/app.ts`)

#### [MODIFY] [app.ts](file:///c:/Users/dagim/channel1-ethiopia/apps/api/src/app.ts)

- Import and register new route modules:
  - `deviceRoutes` at `/api/v1` (public)
  - `eventRoutes` at `/api/v1` (public)  
  - `audienceAnalyticsAdminRoutes` at `/api/v1` (admin-only)

---

## Database Migration

A single migration file will be created covering:
1. `CREATE TABLE anonymous_devices` with all columns and indexes
2. `ALTER TABLE analytics_events ADD COLUMN anonymous_id VARCHAR(100)`
3. `ALTER TABLE ad_events ADD COLUMN anonymous_id VARCHAR(100)`
4. New indexes on the `anonymous_id` columns

---

## Verification Plan

### Automated Tests

1. **Device registration**: Test `POST /api/v1/devices/register` creates device record, returns anonymous ID, upserts on duplicate
2. **Event tracking**: Test `POST /api/v1/events/track` and `/events/batch` with both anonymous-only and authenticated payloads
3. **Identity merge**: Test that after merge, all anonymous events are re-attributed to the user ID, and the merge is idempotent
4. **Ad serving with anonymous ID**: Test that frequency capping works for anonymous users using their `anonymous_id`
5. **Audience analytics**: Test aggregation queries return correct breakdowns
6. **Build check**: `pnpm run build` across all workspaces

### Manual Verification

1. Install the app → verify anonymous ID is generated and device is registered with the API
2. Watch a video, view ads → verify events are tracked with `anonymous_id`
3. Sign up → verify the anonymous history merges into the new user account
4. Open admin panel → verify Audience Insights page shows device/content/watch data
5. Verify ad frequency capping works for a user who never logs in

---

## Summary of Files Touched

| Layer | New Files | Modified Files |
|-------|-----------|----------------|
| **Shared** | `audience.types.ts` | `common.types.ts`, `cache.constants.ts`, `api.constants.ts` |
| **API Schema** | `anonymous-devices.ts`, migration | `analytics.ts`, `sponsors.ts`, `index.ts` |
| **API Modules** | `devices/` (service + route), `events/` (service + route), `audience-analytics.service.ts`, `audience-analytics.admin.route.ts` | `auth.route.ts`, `app.ts`, `analytics/index.ts` |
| **Mobile** | `device-identity.ts`, `event-tracker.ts` | `_layout.tsx`, `auth.store.ts`, `auth.ts`, `ads.ts`, various screens |
| **Admin** | `audience/page.tsx`, `components/audience/*` (5-6 components) | `admin-shell.tsx` |

**Estimated scope**: ~20 files new, ~12 files modified
