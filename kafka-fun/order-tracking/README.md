# 🛒 Kafka Order Tracking System

A simple real-time order tracking system built with KafkaJS and TypeScript to learn Kafka concepts. This project simulates an e-commerce order flow where different services emit order status events.

## 🌟 Features

- Real-time order status updates
- Random order event simulation
- In-memory state management
- Live status dashboard in console
- Event-driven architecture

## 🔄 Order Status Flow

```
Order Placed → Payment Confirmed → Shipped → Delivered
```

## 🛠️ Tech Stack

- KafkaJS
- TypeScript
- Bun Runtime
- Docker (for Kafka & Zookeeper)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- Docker and Docker Compose installed

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

### Running the Application

1. Start Kafka and Zookeeper:
```bash
docker-compose up -d
```

2. Run the application:
```bash
bun run index.ts
```

## 📊 How it Works

1. **Producer** generates random order events every second
2. **Consumer** processes these events and updates the order status
3. Current status is displayed in the console every 5 seconds
4. Each order can be in one of these states:
   - Placed
   - PaymentConfirmed
   - Shipped
   - Delivered

## 🎯 Learning Outcomes

- Kafka Producer/Consumer patterns
- Event-driven architecture
- Real-time data processing
- State management with Kafka

## 📝 Notes

- This is a learning project, not meant for production use
- Uses in-memory storage for simplicity
- Random data generation for demonstration

## 🧪 Testing

The system automatically generates random order events. You can observe the state changes in real-time through the console output.

## 📚 Resources

- [KafkaJS Documentation](https://kafka.js.org/)
- [Apache Kafka](https://kafka.apache.org/)
