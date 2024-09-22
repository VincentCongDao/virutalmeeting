# Project Title

![VirtualMeeting](/public/icons/VirtualMeeting_github.png)

## Run This Project Locally

Install the dependences

```bash
npm install
# or
yarn add
# or
bun add
```

```bash
npm run dev
# or
yarn run dev
# or
bun run dev
```

I also add clerk.js into this project for quick auth.
You will need to public key from them.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to test and create schedule meeting on your domain, you will needs to moditfy your base url inside
.env.local or .env

Example

```bash
// .env.*

NEXT_PUBLIC_BASE_URL= (your domain)

```

## Tech Stack

**Client**

- Next.14
- TypeScript
- TailwindCSS
- Shadcn-UI
- React-DatePicker

**Server**

- getStream

## Lesson From This Project

<a id="Lesson">Lessons Learned</a>

In this project, I gained experience with several important technologies and concepts:

1. GetStream API:

- I learned how to integrate GetStream to manage video call streaming. This helped me create smooth, real-time video meetings, private rooms, and personal meeting rooms.

2. Clerk.js for Authentication:

- I implemented authentication using Clerk.js, allowing users to create meeting links that they can copy and share with others to join the meeting. This simplifies user authentication and improves the security of private meeting rooms.

3. Private and Public Rooms:

- I learned to differentiate between private and public meeting rooms and manage access rights, providing secure links for personal meetings.

4. Real-time Scheduling:

- Implementing scheduling and custom URLs with real-time updates for meetings was a key feature I integrated, allowing users to book meetings in their time zone.

## Credit

- [Gif for Loading Animation](https://pixabay.com/gifs/interview-feedback-talking-dialogue-8470/)
- [Background Hero](https://pixabay.com/illustrations/texture-background-soft-blue-light-1668079/)
- [JavaScriptMastery](https://www.youtube.com/@javascriptmastery)
