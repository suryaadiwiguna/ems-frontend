import { redirect } from "next/navigation";

export default async function OrganizerRootPage() {
    redirect('/organizer/events')
}
