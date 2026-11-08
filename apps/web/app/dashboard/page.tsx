import { Brand } from '../../components/brand';

export default function Dashboard(){return <main className="shell"><nav className="top"><Brand/><span className="pill">PREVIEW</span></nav><section className="hero"><div className="eyebrow">Account overview</div><h1>Your financial home.</h1><p>The authenticated dashboard will be enabled after identity, ledger, account, and permissions services are integrated.</p><div className="notice">No live balances or transactions are displayed in this scaffold. Never treat demo data as a statement or proof of funds.</div></section></main>}
