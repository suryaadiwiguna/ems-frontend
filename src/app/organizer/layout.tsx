import ContentArea from '@/app/organizer/components/contentArea'
import MainMenu from '@/app/organizer/components/mainMenu'
import Sidebar from '@/app/organizer/components/sidebar'
import { Grid } from '@chakra-ui/react'


export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Grid templateColumns={'repeat(6,1fr)'} gap={0}>
        <Sidebar>
          <MainMenu />
        </Sidebar>

        <ContentArea>
          {children}
        </ContentArea>
      </Grid>
    </>
  )
}
