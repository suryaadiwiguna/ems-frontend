interface events {
    id: string
    createdAt: string
    updatedAt: string
    title: string
    type: string
    description: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    maxParticipants: number
    ticketPrice: number
    status: string
    organizerID: string
}

interface validEventResponse {
    isSuccess: Boolean
    code: number
    data: [events]
    msg: string
}