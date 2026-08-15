# West Valley College (WVCC) Club Hub
(updated 2026 AUG 15)

> **Developer Note:** This was built by Oscar Espinosa (aka Deion) as a QOL improvement of the CCC system and I welcome any and all students or educational faculty to use this code to improve their educational community.

An open-source, mobile-first digital hub designed to centralize campus club discovery, simplify event sign-ups, and automate student engagement across West Valley College and Mission College ecosystems.

Visually inspired by Liquid Glass and Material Design, this platform runs on a $0-budget static web infrastructure hosted through GitHub Pages, with external links to sign up for clubs.

---

## Key Features (work in progress)

* ** Zero-Friction Access:** Sub-500ms load times with zero login barriers for students browsing meeting times or rooms.
* ** Smart Search & Category Filters:** Real-time search with instant filtering for tags (*STEM*, *Business*, *Arts*, *Special Interest*).
* ** Live Meeting Badges:** Dynamic tags highlighting clubs holding active meetings on the current day.
* ** Universal Calendar Feed (`.ics` Sync):** One-tap sync directly to Apple Calendar, Google Calendar, and Microsoft Outlook.
* ** Form Agnostic:** Supports both **Microsoft Forms** (Office 365) and **Google Forms** for officer updates and sign-ups.
* ** Native Dark Mode:** System-detected OLED dark mode toggle.

---

## Centralized Setup (`config.js`)

All environment variables and links are maintained inside `config.js` so future student leaders can update the site without touching code:

```javascript
const CONFIG = {
  collegeName: "West Valley College",
  sheetCsvUrl: "YOUR_PUBLISHED_GOOGLE_SHEET_CSV_LINK",
  defaultFormUrl: "YOUR_SIGNUP_FORM_LINK",
  startClubUrl: "YOUR_START_CLUB_FORM_LINK",
  calendarIcsUrl: "webcal://YOUR_PUBLIC_CALENDAR_FEED.ics"
};
