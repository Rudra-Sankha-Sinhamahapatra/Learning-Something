# W8W Platform Documentation

Welcome to **W8W**, a modern open-source workflow automation platform built for teams and individuals who want to automate repetitive tasks, integrate multiple services, and build custom workflows visually — without writing heavy amounts of code.  

Our inspiration comes from platforms like **n8n** and **Zapier**, but W8W is **reimagined for modern developers**, with:  
- A **React + Zustand** frontend.  
- **FastAPI** backend.  
- **PostgreSQL + SQLAlchemy** for persistence.  
- Native support for **AI (Google Gemini, Groq, OpenAI)**.  
- Extensible **node-based workflow editor**.  

---

## ✨ Key Features

- **Visual Workflow Editor**  
  Drag & drop nodes, connect them visually, and configure inputs/outputs easily.  

- **Multiple Workflow Types**  
  - **Manual** → triggered by user.  
  - **Webhook** → external events trigger workflows.  
  - **Form-based** → collect input via hosted forms. It can be webhook or manual but generally it can be manual. but upon submitting form it triggers 

- **Supported Integrations (out of the box)**  
  - Telegram  
  - Slack  
  - Resend Email  
  - Google Gemini  
  - Custom Webhooks  

- **Real-time Execution & Monitoring**  
  See the status of each node as it runs (green = success, yellow = running, red = failure).  

- **AI-Native**  
  Embed AI models like Gemini or Groq into your workflows to classify, summarize, and generate content.  

---

## 🔑 Credential Setup Guides

It is one of the necessary steps before creating workflows with Slack,Telegram,Resend Email you need to add their credentials otherwise you can't add nodes of these on workflows

### 1. Telegram
- **Required fields**:  
  - `botToken`  
  - `chatId`  

**Setup Steps**:  
1. Open Telegram → Search **BotFather**.  
2. Send `/newbot` → choose a name & username (must end in `bot`).  
3. Copy the **bot token** provided.  
4. Start a chat with your bot and send a message.  
5. Fetch your updates:  
```

[https://api.telegram.org/bot](https://api.telegram.org/bot)<botToken>/getUpdates

```
6. In the response, find `"chat": { "id": ... }`. That’s your `chatId`.  
7. Use `botToken` + `chatId` in W8W credentials.  

**Troubleshooting**:  
- If no chatId appears, ensure you sent a message.  
- In group chats, add bot + send a message.  
- Try `/start` command.  

---

### 2. Google Gemini
- **Required field**: `geminiApiKey`  

**Setup Steps**:  
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey).  
2. Sign in → click **Get API Key**.  
3. Copy the key.  
4. Paste it into W8W credentials as `geminiApiKey`.  

---

### 3. Resend Email
- **Required fields**:  
- `apiKey`  
- `resendDomainMail`  

**Setup Steps**:  
1. Sign up at [Resend.com](https://resend.com).  
2. Generate an API Key.  
3. Verify your sending domain (e.g. `yourdomain.com`).  
4. Use a verified sender email like `noreply@yourdomain.com`.  

**⚠️ Note**: Without a verified domain, you can only send emails to your own account.  

---

### 4. Slack
- **Required fields**:  
- `botToken`  
- `channelId`  

**Setup Steps**:  
1. Create a Slack App → [Slack API](https://api.slack.com/apps).  
2. Enable **Bots** and add `chat:write` scope.  
3. Install app to your workspace.  
4. Copy **Bot User OAuth Token**.  
5. To get `channelId`:  
```

[https://slack.com/api/conversations.list?types=public_channel,private_channel](https://slack.com/api/conversations.list?types=public_channel,private_channel)

````
Include the `botToken` in Authorization header.  
6. Invite bot to channel: `/invite @YourBotName`.  

---

## 🔄 Workflow Types

1. **Manual**  
Trigger workflows from Dashboard. Best for one-time tasks.  

2. **Webhook**  
Configure endpoints → external services call them to trigger flows.  
- Fields: `title`, `method`, `secret`.  
- Secret is validated via `Authorization` header.  

3. **Form**  
Host forms → collect user data → pass into workflows.  
- Supports text, number, select, textarea inputs.  
- Two-step saving required (`Save Fields` + `Save Workflow`).  


Once credentials are set up, you can create workflows.

### 1. Manual Workflows

* Run directly from the Dashboard.
* Good for testing and one-time tasks.

### 2. Webhook Workflows

* Expose an HTTP endpoint.
* External services can trigger it (POST/GET).
* Supports secrets for authentication.

### 3. Form Workflows (special W8W node - can be manual or webhook but generally manual)

W8W has a **special Form node**, similar to n8n’s form node, but reimagined.

* Lets you collect user input from a hosted form.
* Example use: Job application form → AI (Gemini) → Telegram notification.
* **Supported input types:**

  * Text
  * Number
  * Select (dropdown)
  * Textarea
* **Two-step save required:**

  1. Inside the form node → click **Save Fields**.
  2. Then save the workflow itself.
* **Form URL**: Each form node generates a hosted form URL which you can share with users.
* **Validation**: Required fields must be filled, otherwise submission fails.

**Example Form Node Config:**

```yaml
Fields:
- key: name | label: Name | type: text | required: true
- key: haveExperience | label: Do you have experience? | type: select | required: true | options: Yes, No
- key: skills | label: Skills | type: text | required: true
- key: yearsofexperience | label: Years of Experience | type: number | required: true
- key: explanation | label: Explanation | type: textarea | required: true
```

When submitted, the data flows into the workflow as:

```json
{
  "name": "Alice",
  "haveExperience": "Yes",
  "skills": "Python, AWS",
  "yearsofexperience": 3,
  "explanation": "Worked on cloud infra automation."
}
```

---


## 📚 Workflow Examples

### Example 1: Webhook → Gemini → Email → Telegram
- Webhook receives signup → Gemini writes welcome email → Resend sends email → Telegram posts alert.  

### Example 2: Manual → Telegram → Email
- Manual trigger → Sends message to Telegram → Sends confirmation via email → Telegram confirms email delivery.  

### Example 3: Form → Gemini → Telegram
- Candidate applies via form → Gemini evaluates suitability → Telegram sends evaluation.  

### Example 4: Slack → Telegram
- Forward Slack messages into Telegram automatically.  

---

## 🛠️ Variable & Template System

- `{{ $json.body.field }}` → access webhook request body fields.  
- `{{ $node.node1.text }}` → reference node output.  
- `{{ $node.node1.text.subject }}` → reference nested fields from structured JSON.  

**Example**:  
```text
Sent welcome email to {{ $json.body.name }} ({{ $json.body.email }})
Subject: {{ $node.node1.text.subject }}
Body: {{ $node.node1.text.body }}
````

---

## 💡 Best Practices

1. Always save workflows after edits.
2. For Form nodes, save fields first, then save workflow.
3. Use test webhooks with `curl` to debug.
4. Leverage Gemini/AI nodes to validate or enrich data.
5. Use Slack/Telegram as notification sinks for visibility.

---

## 💸 Pricing Plans *(synthetic example)*

### Free Plan

* 3 workflows
* 200 runs/month
* 2 credentials
* Community support

### Pro ($15/mo)

* Unlimited workflows
* 10,000 runs/month
* 20 credentials
* Priority email support

### Team ($49/mo)

* Everything in Pro
* 5 users
* 50,000 runs/month
* Advanced analytics

### Enterprise (Custom)

* Unlimited everything
* Dedicated support
* Private hosting option
* SLA guarantees

---

## ❓ Frequently Asked Questions

**Q: What is a node?**
A: A node is a single unit in a workflow (e.g. Gemini, Telegram).

**Q: Can I use my own API?**
A: Yes — via Webhook nodes or custom extensions.

**Q: How is execution tracked?**
A: Each node shows live status (green, yellow, red). Logs are stored for debugging.

**Q: Can I run workflows offline?**
A: Workflows require server runtime; offline mode is not supported.

**Q: How is AI used?**
A: AI nodes (Gemini) can classify, generate, and enrich data with memory option

---

## 🚀 Roadmap (synthetic future features)

* **Q4 2025**: Native database integration (Postgres, MySQL nodes).
* **Q1 2026**: Browser automation node (headless Chrome).
* **Q2 2026**: Marketplace for community-built nodes.
* **Q3 2026**: Multi-tenant enterprise mode.
* **Q4 2026**: Built-in analytics dashboard.

---

## 📖 Glossary

* **Workflow**: A sequence of connected nodes.
* **Node**: Single step in workflow (API call, AI prompt, notification).
* **Webhook**: HTTP endpoint to trigger workflows externally.
* **Credential**: Secure API keys or tokens required by nodes.
* **Execution log**: Record of inputs, outputs, and status for each run.

---

## 📌 Example User Queries

* "How do I create a webhook workflow?"
* "What are the limits in Free vs Pro plans?"
* "How do I connect Slack and Telegram together?"
* "Why is my Telegram bot not returning chatId?"
* "What does {{ $node.node1.text }} mean in templates?"

---

# 🔎 Quick Reference

* **Telegram**: botToken, chatId

* **Slack**: botToken, channelId

* **Gemini**: geminiApiKey

* **Resend**: apiKey, resendDomainMail

* **Manual workflows** → dashboard run

* **Webhook workflows** → external triggers

* **Form workflows** → user input collection

👉 That’s why keeping **docs updated** is critical — the agent queries these docs directly to answer tickets.

---


