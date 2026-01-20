# Fuel Price Monitoring & Comparison App (FuelSmart NG)

FuelSmart NG is a **crowdsourced mobile application** built with **React Native (TypeScript)**, **Firebase**, and **Google Maps/Places APIs** to help users discover nearby fuel stations, report fuel prices, and compare prices across locations in Nigeria.
The system incorporates a **trust scoring algorithm** and **administrative moderation** to improve the reliability of user-submitted data.

---

## 📱 Features

### User Features

- 📍 **Nearby Fuel Stations**
  - Fetches nearby stations based on the user’s current GPS location using Google Places API
  - Distance calculation and sorting by proximity

- ⛽ **Fuel Price Reporting**
  - Users can report prices for:
    - Petrol (PMS)
    - Diesel (AGO)
    - Kerosene (DPK)

  - Station search powered by Google Places
  - Automatic state extraction from place details

- 📊 **Price Display & Filtering**
  - View reported prices per station
  - Toggle between fuel types using tabs
  - Filter stations with or without reported prices
  - “Reported X mins ago” timestamp display

- 👍👎 **Community Feedback**
  - Like and dislike reports
  - One vote per user per report

- 🔐 **Authentication**
  - Email/password authentication using Firebase Auth

---

### Trust & Reliability Features

- 🧠 **Trust Scoring Algorithm**
  - Detects outliers using mean and standard deviation
  - Classifies reports as:
    - `valid`
    - `suspicious`
    - `rejected`

  - Cold-start fallback using domain-specific fuel price ranges

- 📈 **Chart Visualization**
  - Visualizes historical price trends per station and fuel type
  - Helps users identify price fluctuations over time

---

### Admin Features

- 🛡 **Admin Review Dashboard**
  - View all reports flagged as `suspicious` or `rejected`
  - Approve or reject reports manually
  - Real-time updates using Firestore listeners

- 🔎 **Moderation Support**
  - Review reports across all stations using Firestore `collectionGroup` queries
  - Station details dynamically fetched for review context

---

## 🧱 Tech Stack

### Frontend

- **React Native**
- **TypeScript**
- **Expo**
- **NativeWind / StyleSheet**
- **React Navigation**

### Backend & Services

- **Firebase Authentication**
- **Cloud Firestore**
- **Google Maps SDK**
- **Google Places API**

---

## 🗂 Project Structure (Simplified)

```
src/
├── app/
│   ├── index.tsx            # Home screen (nearby stations)
│   ├── report.tsx      # Submit price screen
│   └── screens/
│       └── admins.tsx
│
├── components/
│   ├── StationCard.tsx
│   ├── FuelSelector.tsx
│   └── StationSearchInput.tsx
│
├── services/
│   ├── googlePlaces.ts
│   ├── placeDetails.ts
│   ├── reportService.ts
│   ├── reportQueries.ts
│   ├── adminReportQueries.ts
│   └── adminReportActions.ts
│
├── utils/
│   ├── distance.ts
│   ├── delay.ts
│   ├── extractState.ts
│   ├── trustscoring.ts
│   └── fuelPriceRanges.ts
│
├── types/
│   ├── GooglePlace.ts
│   ├── report.ts
│   └── fuels.ts
│
└── firebaseConfig.ts
```

---

## 🧠 Trust Scoring Algorithm (Summary)

Each price report is evaluated using:

- **Outlier detection** (mean ± threshold × standard deviation)
- **Domain-specific fuel price bounds** (cold start handling)

Reports are classified as:

- **Valid**
- **Suspicious**
- **Rejected**

This hybrid approach combines statistical analysis with domain knowledge and human moderation.

---

## 🗃 Data Model Overview

### Core Entities

- **User** – authenticated via Firebase Auth
- **Station** – identified by Google Place ID
- **PriceReport** – fuel price submissions with trust metadata
- **PriceChart** – derived visualization entity

Firestore Structure:

```
stationss/
  └── {stationId}/
      ├── station fields
      └── reports/
          └── {reportId}
```

---

## 🔐 Security & Access Control

- Firebase Authentication for user identity
- Firestore Security Rules:
  - Only authenticated users can submit reports
  - Only admins can approve/reject flagged reports

- Admin role enforced via custom claims

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- Expo CLI
- Firebase project
- Google Cloud project with:
  - Maps SDK (Android)
  - Places API

### Installation

```bash
git clone https://github.com/your-username/fuelsmart-ng.git
cd fuelsmart-ng
npm install
```

### Environment Setup

Create a `.env` file and add:

```
GOOGLE_MAPS_API_KEY=your_api_key
```

Configure Firebase in `firebaseConfig.ts`.

### Run the App

```bash
npx expo start
```

---

## 📌 Future Improvements

- User reputation system
- State-specific price range adaptation
- Offline report caching
- Advanced analytics dashboard
- Automated anomaly detection using ML

---

## 📄 License

This project is for academic and educational purposes.
