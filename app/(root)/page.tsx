import { HeaderBox } from "@/components/HeaderBox"
import { RightSidebar } from "@/components/RightSidebar"
import { TotalBalanceBox } from "@/components/TotalBalanceBox"
import { getLoggedInUser } from "@/lib/actions/user.actions"

export default async function Home() {
  const loggedIn = await getLoggedInUser()

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          {" "}
          <HeaderBox
            type='greeting'
            title='Bienvenue'
            user={loggedIn?.name || "Invité"}
            subtext='Gérez vos comptes et vos depenses avec efficacité.'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250}
          />
        </header>
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 7250 }, { currentBalance: 1250 }]}
      />
    </section>
  )
}
