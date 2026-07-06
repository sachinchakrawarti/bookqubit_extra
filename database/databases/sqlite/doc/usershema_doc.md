# BookQubit User Management Database Schema

## Overview
This document describes the complete user management database schema for BookQubit. The schema is designed to handle user authentication, profiles, preferences, notifications, activities, and social features.

## Database Information
- **Database Type:** SQLite
- **Schema Version:** 1.0.0
- **Total Tables:** 20
- **Total Enums:** 7
- **Last Updated:** 2024

---

## Table of Contents
1. [Enums](#enums)
2. [Core Tables](#core-tables)
3. [User Profile Tables](#user-profile-tables)
4. [Authentication Tables](#authentication-tables)
5. [User Activity Tables](#user-activity-tables)
6. [Social Tables](#social-tables)
7. [Subscription Tables](#subscription-tables)
8. [Relationships](#relationships)
9. [Sample Queries](#sample-queries)

---

## Enums

### user_role
Defines user permission levels.

| Value | Description |
|-------|-------------|
| `user` | Regular user |
| `editor` | Can edit content |
| `admin` | Administrative access |
| `super_admin` | Full system access |

### user_status
User account status.

| Value | Description |
|-------|-------------|
| `active` | Account is active and usable |
| `inactive` | Account is deactivated |
| `suspended` | Temporarily suspended |
| `banned` | Permanently banned |
| `pending_verification` | Awaiting verification |

### gender
User gender options.

| Value | Description |
|-------|-------------|
| `male` | Male |
| `female` | Female |
| `other` | Other gender |
| `prefer_not_to_say` | Prefers not to disclose |

### notification_type
Notification delivery channels.

| Value | Description |
|-------|-------------|
| `email` | Email notification |
| `push` | Push notification |
| `in_app` | In-app notification |
| `sms` | SMS notification |

### notification_priority
Notification priority levels.

| Value | Description |
|-------|-------------|
| `low` | Low priority |
| `medium` | Medium priority |
| `high` | High priority |
| `urgent` | Urgent priority |

### device_type
Device type identification.

| Value | Description |
|-------|-------------|
| `web` | Web browser |
| `mobile` | Mobile device |
| `tablet` | Tablet device |
| `desktop` | Desktop computer |
| `api` | API call |

### login_status
Login attempt status.

| Value | Description |
|-------|-------------|
| `success` | Successful login |
| `failed` | Failed login |
| `locked` | Account locked |
| `expired` | Session expired |

---

## Core Tables

### users
Main user table storing core user information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique user ID |
| `username` | varchar(100) | UNIQUE, NOT NULL | User's username |
| `email` | varchar(200) | UNIQUE, NOT NULL | User's email address |
| `phone` | varchar(20) | | User's phone number |
| `password_hash` | varchar(255) | NOT NULL | Hashed password |
| `password_salt` | varchar(50) | | Password salt |
| `full_name` | varchar(200) | | User's full name |
| `avatar_url` | text | | Profile picture URL |
| `bio` | text | | User's biography |
| `date_of_birth` | datetime | | User's date of birth |
| `gender` | gender | | User's gender |
| `country` | varchar(100) | | User's country |
| `city` | varchar(100) | | User's city |
| `timezone` | varchar(50) | | User's timezone |
| `language_preference` | varchar(20) | | Preferred language |
| `role` | user_role | DEFAULT: 'user' | User's role |
| `status` | user_status | DEFAULT: 'active' | Account status |
| `is_verified` | boolean | DEFAULT: false | Email verification |
| `is_2fa_enabled` | boolean | DEFAULT: false | Two-factor auth |
| `email_verified_at` | datetime | | Email verification time |
| `phone_verified_at` | datetime | | Phone verification |
| `last_login` | datetime | | Last login time |
| `login_count` | integer | DEFAULT: 0 | Total logins |
| `failed_login_attempts` | integer | DEFAULT: 0 | Failed attempts |
| `locked_until` | datetime | | Account lock time |
| `referral_code` | varchar(50) | UNIQUE | Referral code |
| `referred_by` | integer | FK → users.id | Referrer ID |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |
| `deleted_at` | datetime | | Soft delete time |

**Indexes:** username, email, phone, role, status, is_verified, created_at, referral_code, referred_by

---

## User Profile Tables

### user_profiles
Extended user profile information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | UNIQUE, NOT NULL, FK → users.id | User ID |
| `display_name` | varchar(200) | | Display name |
| `first_name` | varchar(100) | | First name |
| `last_name` | varchar(100) | | Last name |
| `bio` | text | | Biography |
| `website` | varchar(255) | | Personal website |
| `company` | varchar(200) | | Company name |
| `job_title` | varchar(200) | | Job title |
| `industry` | varchar(100) | | Industry |
| `education` | text | | Education details |
| `skills` | text | JSON array | Skills list |
| `interests` | text | JSON array | Interests |
| `social_links` | text | JSON | Social media links |
| `profile_visibility` | varchar(20) | DEFAULT: 'public' | Visibility setting |
| `show_email` | boolean | DEFAULT: false | Show email |
| `show_phone` | boolean | DEFAULT: false | Show phone |
| `show_birthday` | boolean | DEFAULT: false | Show birthday |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

**Indexes:** user_id, display_name, company, job_title

### user_addresses
User address information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `address_type` | varchar(20) | DEFAULT: 'shipping' | Address type |
| `address_line1` | varchar(255) | NOT NULL | Address line 1 |
| `address_line2` | varchar(255) | | Address line 2 |
| `city` | varchar(100) | | City |
| `state` | varchar(100) | | State/Province |
| `postal_code` | varchar(20) | | Postal code |
| `country` | varchar(100) | | Country |
| `is_default` | boolean | DEFAULT: false | Default address |
| `is_active` | boolean | DEFAULT: true | Active status |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

---

## Authentication Tables

### user_sessions
User session management.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `token` | varchar(255) | UNIQUE, NOT NULL | Session token |
| `refresh_token` | varchar(255) | UNIQUE | Refresh token |
| `ip_address` | varchar(50) | | IP address |
| `user_agent` | text | | User agent |
| `device_type` | device_type | DEFAULT: 'web' | Device type |
| `device_name` | varchar(100) | | Device name |
| `platform` | varchar(50) | | Platform |
| `browser` | varchar(50) | | Browser name |
| `browser_version` | varchar(20) | | Browser version |
| `location` | varchar(200) | | Geographic location |
| `is_active` | boolean | DEFAULT: true | Active session |
| `expires_at` | datetime | NOT NULL | Expiration time |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

**Indexes:** token, refresh_token, user_id, expires_at, is_active

### user_login_history
Login attempt tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `status` | login_status | NOT NULL | Login status |
| `ip_address` | varchar(50) | | IP address |
| `user_agent` | text | | User agent |
| `device_type` | device_type | | Device type |
| `location` | varchar(200) | | Location |
| `login_method` | varchar(50) | | Login method |
| `failed_reason` | varchar(200) | | Failure reason |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |

### user_reset_tokens
Password/email reset tokens.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `token` | varchar(255) | UNIQUE, NOT NULL | Reset token |
| `type` | varchar(50) | DEFAULT: 'password' | Token type |
| `expires_at` | datetime | NOT NULL | Expiration time |
| `is_used` | boolean | DEFAULT: false | Used status |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |

### user_verification_tokens
Email/phone verification tokens.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `token` | varchar(255) | UNIQUE, NOT NULL | Verification token |
| `type` | varchar(50) | DEFAULT: 'email' | Token type |
| `expires_at` | datetime | NOT NULL | Expiration time |
| `is_used` | boolean | DEFAULT: false | Used status |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |

---

## User Activity Tables

### user_preferences
User preference settings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `preference_key` | varchar(100) | NOT NULL | Preference key |
| `preference_value` | text | | Preference value |
| `category` | varchar(50) | DEFAULT: 'general' | Category |
| `is_active` | boolean | DEFAULT: true | Active status |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

**Unique Constraint:** (user_id, preference_key)

### user_notifications
User notifications.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `notification_type` | notification_type | NOT NULL | Type |
| `priority` | notification_priority | DEFAULT: 'medium' | Priority |
| `title` | varchar(200) | NOT NULL | Notification title |
| `message` | text | | Notification message |
| `body` | text | | Full body |
| `icon_url` | text | | Icon URL |
| `link` | text | | Action link |
| `image_url` | text | | Image URL |
| `action_label` | varchar(50) | | Button label |
| `action_url` | text | | Button URL |
| `is_read` | boolean | DEFAULT: false | Read status |
| `is_dismissed` | boolean | DEFAULT: false | Dismissed |
| `is_clicked` | boolean | DEFAULT: false | Clicked |
| `read_at` | datetime | | Read time |
| `dismissed_at` | datetime | | Dismissed time |
| `clicked_at` | datetime | | Clicked time |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |

### user_notification_settings
User notification preferences.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `category` | varchar(50) | NOT NULL | Category |
| `channel` | notification_type | NOT NULL | Channel |
| `is_enabled` | boolean | DEFAULT: true | Enabled |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

**Unique Constraint:** (user_id, category, channel)

### user_devices
User device management.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `device_token` | varchar(255) | UNIQUE, NOT NULL | Device token |
| `device_type` | device_type | NOT NULL | Device type |
| `device_name` | varchar(100) | | Device name |
| `platform` | varchar(50) | | Platform |
| `platform_version` | varchar(20) | | Platform version |
| `app_version` | varchar(20) | | App version |
| `model` | varchar(100) | | Device model |
| `manufacturer` | varchar(100) | | Manufacturer |
| `is_active` | boolean | DEFAULT: true | Active status |
| `last_active_at` | datetime | | Last active |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

### user_activities
User activity tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `activity_type` | varchar(50) | NOT NULL | Activity type |
| `activity_category` | varchar(50) | | Category |
| `content_type` | varchar(50) | | Content type |
| `content_id` | integer | | Content ID |
| `metadata` | text | JSON | Additional data |
| `ip_address` | varchar(50) | | IP address |
| `user_agent` | text | | User agent |
| `device_type` | device_type | | Device type |
| `session_id` | integer | FK → user_sessions.id | Session ID |
| `duration_seconds` | integer | | Duration |
| `is_active` | boolean | DEFAULT: true | Active status |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |

---

## Social Tables

### user_follows
User following relationships.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `follower_user_id` | integer | NOT NULL, FK → users.id | Follower |
| `following_user_id` | integer | NOT NULL, FK → users.id | Following |
| `status` | varchar(20) | DEFAULT: 'active' | Relationship status |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

**Unique Constraint:** (follower_user_id, following_user_id)

### user_favorites
User favorites.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `content_type` | varchar(50) | NOT NULL | Content type |
| `content_id` | integer | NOT NULL | Content ID |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |

**Unique Constraint:** (user_id, content_type, content_id)

### user_ratings
User content ratings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `content_type` | varchar(50) | NOT NULL | Content type |
| `content_id` | integer | NOT NULL | Content ID |
| `rating` | integer | CHECK: 1-5 | Rating value |
| `is_anonymous` | boolean | DEFAULT: false | Anonymous |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

**Unique Constraint:** (user_id, content_type, content_id)

### user_stats
User statistics.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | UNIQUE, NOT NULL, FK → users.id | User ID |
| `total_books_read` | integer | DEFAULT: 0 | Total books read |
| `total_comics_read` | integer | DEFAULT: 0 | Total comics read |
| `total_reviews_written` | integer | DEFAULT: 0 | Total reviews |
| `total_favorites` | integer | DEFAULT: 0 | Total favorites |
| `total_downloads` | integer | DEFAULT: 0 | Total downloads |
| `total_shares` | integer | DEFAULT: 0 | Total shares |
| `total_followers` | integer | DEFAULT: 0 | Total followers |
| `total_following` | integer | DEFAULT: 0 | Total following |
| `reading_streak` | integer | DEFAULT: 0 | Current streak |
| `longest_reading_streak` | integer | DEFAULT: 0 | Longest streak |
| `last_activity_date` | datetime | | Last activity |
| `total_reading_time` | integer | DEFAULT: 0 | Reading time |
| `total_pages_read` | integer | DEFAULT: 0 | Pages read |
| `average_rating_given` | decimal(3,2) | DEFAULT: 0.00 | Average rating |
| `achievements_count` | integer | DEFAULT: 0 | Achievements |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

### user_badges
User achievements/badges.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `badge_name` | varchar(100) | NOT NULL | Badge name |
| `badge_type` | varchar(50) | | Badge type |
| `badge_level` | integer | DEFAULT: 1 | Badge level |
| `badge_icon` | text | | Badge icon |
| `badge_description` | text | | Description |
| `points_earned` | integer | DEFAULT: 0 | Points |
| `progress` | integer | DEFAULT: 0 | Progress % |
| `unlocked_at` | datetime | | Unlock time |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

**Unique Constraint:** (user_id, badge_name)

---

## Subscription Tables

### user_subscriptions
User subscription plans.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `user_id` | integer | NOT NULL, FK → users.id | User ID |
| `subscription_type` | varchar(50) | NOT NULL | Type |
| `plan_name` | varchar(100) | | Plan name |
| `plan_price` | decimal(10,2) | | Price |
| `currency` | varchar(10) | DEFAULT: 'USD' | Currency |
| `billing_cycle` | varchar(20) | | Cycle |
| `start_date` | datetime | NOT NULL | Start date |
| `end_date` | datetime | | End date |
| `is_active` | boolean | DEFAULT: true | Active |
| `auto_renew` | boolean | DEFAULT: false | Auto-renew |
| `stripe_customer_id` | varchar(100) | | Stripe customer |
| `stripe_subscription_id` | varchar(100) | | Stripe sub |
| `payment_method` | varchar(50) | | Payment method |
| `last_payment_date` | datetime | | Last payment |
| `next_payment_date` | datetime | | Next payment |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

### user_invitations
User invitations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | integer | PRIMARY KEY, AUTO_INCREMENT | Unique ID |
| `inviter_user_id` | integer | NOT NULL, FK → users.id | Inviter |
| `invitee_email` | varchar(200) | NOT NULL | Invitee email |
| `invitee_name` | varchar(200) | | Invitee name |
| `token` | varchar(255) | UNIQUE, NOT NULL | Invite token |
| `role` | user_role | DEFAULT: 'user' | Role |
| `message` | text | | Custom message |
| `expires_at` | datetime | NOT NULL | Expiration |
| `is_accepted` | boolean | DEFAULT: false | Accepted |
| `accepted_at` | datetime | | Acceptance time |
| `created_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Creation time |
| `updated_at` | datetime | DEFAULT: CURRENT_TIMESTAMP | Last update |

---

## Relationships

### Foreign Key References
