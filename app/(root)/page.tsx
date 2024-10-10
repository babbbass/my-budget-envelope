import { HeaderBox } from "@/components/HeaderBox"
import { TotalBalanceBox } from "@/components/TotalBalanceBox"

export default function Home() {
  const loggedIn = { firstName: "Babbass" }
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          {" "}
          <HeaderBox
            type='greeting'
            title='Bienvenue'
            user={loggedIn.firstName || "Invité"}
            subtext='Gérez vos comptes et vos depenses avec efficacité.'
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250}
          />
        </header>
      </div>
    </section>
  )
}
