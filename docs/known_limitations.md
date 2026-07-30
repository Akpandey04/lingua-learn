# Known Limitations

As LinguaLearn enters Beta, several architectural and feature constraints exist. We document these transparently to ensure beta testers and stakeholders evaluate the platform fairly against its current v1.0.0 capabilities.

## Technical & Audio Limitations
- **Browser SpeechRecognition Inconsistencies:** The platform relies on the experimental `window.SpeechRecognition` API. Support is excellent on Chrome/Edge (Desktop/Android) but currently unsupported or highly inconsistent on Firefox and iOS Safari. 
- **TTS Voice Availability:** Text-to-Speech (TTS) relies on the OS and browser's built-in voices. If a user's device lacks a high-quality voice for a specific locale (e.g., `ja-JP`), the audio may sound robotic or fail to play.
- **Japanese Speech Limitations:** Speech recognition for Japanese relies heavily on precise context. Evaluating pronunciation for zero-space languages via basic Web Speech APIs can sometimes yield false negatives.

## Feature Limitations (Phase 6/7 Roadmap)
- **No Spaced Repetition Yet:** The `Mistake Notebook` logs errors, but the engine does not currently inject review sessions proactively into the user's daily flow.
- **Offline Mode Not Implemented:** The platform requires an active internet connection to load Next.js chunks and utilize browser Speech APIs. Service workers and offline caching are not yet configured.
- **No Daily Goals/Streaks:** The dashboard shows overall progress, but does not currently track daily streaks, XP, or engagement loops designed to drive daily retention.
- **No Teacher/Admin Dashboard:** The platform is currently single-player only. There is no portal for educators to track student progress.

## Content Limitations
- **Dialect Neutrality:** Current language plugins (e.g., Spanish) default to standard or Castilian vocabulary. Regional toggles (e.g., Latin American Spanish) are not yet supported.
