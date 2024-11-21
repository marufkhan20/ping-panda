import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { DashboardPage } from "@/components/dashboard-page"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { PlusIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { DashboardPageContent } from "./dashboard-page-content"

const Dashboard = async () => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  })

  if (!user) {
    redirect("/sign-in")
  }
  return (
    <DashboardPage
      cta={
        <CreateEventCategoryModal>
          <Button className="w-full">
            <PlusIcon className="size-4 mr-2" /> Add Category
          </Button>
        </CreateEventCategoryModal>
      }
      title="Dashboard"
    >
      <DashboardPageContent />
    </DashboardPage>
  )
}

export default Dashboard
