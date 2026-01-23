<script>
	// Data will come from your backend
	let savingsData = {
		total: 0,
		monthlyIn: 0,
		monthlyOut: 0,
		goalProgress: 0,
		dailyNeeded: 0
	};

	let goals = [];
	let categories = [];
	let contributions = [];
	let monthlySpending = [];
	let upcomingExpenses = [];

	const now = new Date();
	const monthIndex = now.getMonth() + 1;
	const monthName = now.toLocaleString('default', { month: 'long' });

	const nextGoal = 1;

	// Functions for calculations
	$: savingsData.net = savingsData.monthlyIn - savingsData.monthlyOut;
	$: savingsData.savingsRate = savingsData.total > 0 ? Math.round((savingsData.net / savingsData.monthlyIn) * 100) : 0;

	function formatCurrency(value) {
		return new Intl.NumberFormat('fi-FI', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2
		}).format(value);
	}

	function getDaysUntil(dateString) {
		if (!dateString) return 0;
		const today = new Date();
		const target = new Date(dateString);
		const diff = target - today;
		return Math.ceil(diff / (1000 * 60 * 60 * 24));
	}
</script>

<div class="dashboard">
	<!-- 1. Header Section -->
	<div class="header-section">
		<div class="header-main">
			<div class="header-title">
				<div class="logo">💰</div>
				<h1>Savings Tracker</h1>
			</div>
			<div class="header-info">
				<div class="info-item">
					<span class="value">{monthName}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- 2. Main Stats Grid -->
	<div class="stats-grid">
		<div class="stat-card total">
			<div class="stat-icon">💎</div>
			<div class="stat-content">
				<div class="stat-label">Total Saved</div>
				<div class="stat-value">{formatCurrency(savingsData.total)}</div>
				<div class="stat-progress">
					<div class="progress">
						<div class="progress-fill" style="width: {savingsData.goalProgress}%"></div>
					</div>
					<div class="progress-text">{savingsData.goalProgress}% of goal</div>
				</div>
			</div>
		</div>

		<div class="stat-card flow">
			<div class="stat-icon">📊</div>
			<div class="stat-content">
				<div class="stat-label">Monthly Flow</div>
				<div class="flow-details">
					<div class="flow-row">
						<span class="flow-type">In:</span>
						<span class="flow-amount in">{formatCurrency(savingsData.monthlyIn)}</span>
					</div>
					<div class="flow-row">
						<span class="flow-type">Out:</span>
						<span class="flow-amount out">{formatCurrency(savingsData.monthlyOut)}</span>
					</div>
					<div class="flow-row total">
						<span class="flow-type">Net:</span>
						<span class="flow-amount net">{formatCurrency(savingsData.net)}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="stat-card goal">
			<div class="stat-icon">🎯</div>
			<div class="stat-content">
				<div class="stat-label">Active Goals</div>
				<div class="stat-value">{goals.length}</div>
				{#if goals.length > 0}
					<div class="next-goal">
						<div class="goal-name">{goals[0].name}</div>
						<div class="goal-amount">{formatCurrency(goals[0].target)}</div>
					</div>
				{:else}
					<div class="no-goals">No goals set</div>
				{/if}
			</div>
		</div>

		<div class="stat-card rate">
			<div class="stat-icon">💭</div>
			<div class="stat-content">
				<div class="stat-label">Until {nextGoal}</div>
				<div class="stat-value">{formatCurrency(savingsData.total)}</div>
				<div class="stat-progress">
					<div class="progress">
						<div class="progress-fill" style="width: {savingsData.goalProgress}%"></div>
					</div>
					<div class="progress-text">{savingsData.goalProgress}% of goal</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 4. Spending & Categories -->
	<div class="section">
		<div class="section-header">
			<h2>Spending Categories</h2>
			<div class="value">{monthName}</div>
		</div>

		<div class="categories-grid">
		</div>
	</div>

	<!-- 6. Monthly Overview -->
	<div class="section">
		<div class="section-header">
			<h2>Monthly Overview</h2>
			<div class="value">{monthName}</div>
		</div>

		<div class="overview-grid">
			<div class="overview-card">
				<div class="overview-icon">💰</div>
				<div class="overview-content">
					<div class="overview-value">{formatCurrency(savingsData.monthlyIn)}</div>
					<div class="overview-label">Total Income</div>
				</div>
			</div>

			<div class="overview-card">
				<div class="overview-icon">💸</div>
				<div class="overview-content">
					<div class="overview-value">{formatCurrency(savingsData.monthlyOut)}</div>
					<div class="overview-label">Total Expenses</div>
				</div>
			</div>

			<div class="overview-card">
				<div class="overview-icon">📈</div>
				<div class="overview-content">
					<div class="overview-value">{savingsData.savingsRate}%</div>
					<div class="overview-label">Savings Rate</div>
				</div>
			</div>

			<div class="overview-card">
				<div class="overview-icon">🎯</div>
				<div class="overview-content">
					<div class="overview-value">{contributions.length}</div>
					<div class="overview-label">Contributions</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
    .dashboard {
        padding: 24px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    /* Header Section */
    .header-section {
        border: 2px solid #9BCFD8;
        border-radius: 20px;
        padding: 24px;
    }

    .header-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-title {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .logo {
        font-size: 32px;
        width: 56px;
        height: 56px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 28px;
        font-weight: 800;
        color: #1A4D5E;
        margin: 0;
    }

    .header-info {
        display: flex;
        gap: 24px;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .value {
        color: #2A6976;
        font-size: 15px;
        font-weight: 700;
        margin-top: 4px;
    }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .stat-card {
        border: 2px solid;
        border-radius: 20px;
        padding: 24px;
        display: flex;
        align-items: flex-start;
        gap: 20px;
    }

    .stat-card.total {
        border-color: #88C9D4;
    }

    .stat-card.flow {
        border-color: #88C9D4;
    }

    .stat-card.goal {
        border-color: #88C9D4;
    }

    .stat-card.rate {
        border-color: #88C9D4;
    }

    .stat-icon {
        font-size: 28px;
        width: 56px;
        height: 56px;
        border-radius: 14px;
        background: #C2E5ED;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .stat-content {
        flex: 1;
    }

    .stat-label {
        color: #7AAEB8;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
    }

    .stat-value {
        font-size: 32px;
        font-weight: 800;
        color: #1A4D5E;
        margin-bottom: 20px;
        line-height: 1;
    }

    .stat-progress {
        margin-top: 20px;
    }

    .progress {
        height: 8px;
        background: #D9F0F5;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
    }

    .progress-fill {
        height: 100%;
        background: #5DB8C8;
        border-radius: 4px;
    }

    .progress-text {
        color: #7AAEB8;
        font-size: 13px;
        font-weight: 600;
    }

    /* Flow Details */
    .flow-details {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .flow-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        border-bottom: 1px solid #D9F0F5;
    }

    .flow-row.total {
        border-bottom: none;
        padding-top: 12px;
        border-top: 2px solid #A8D8E0;
        font-weight: 700;
    }

    .flow-type {
        color: #2A6976;
        font-size: 15px;
        font-weight: 600;
    }

    .flow-amount {
        font-weight: 800;
        font-size: 18px;
    }

    .flow-amount.in {
        color: #2A6976;
    }

    .flow-amount.out {
        color: #7AAEB8;
    }

    .flow-amount.net {
        color: #1A4D5E;
        font-size: 20px;
    }

    /* Goal Specific */
    .next-goal {
        margin-top: 16px;
        padding: 16px;
        background: rgba(93, 184, 200, 0.1);
        border-radius: 12px;
        border: 1px solid rgba(93, 184, 200, 0.2);
    }

    .goal-name {
        color: #1A4D5E;
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 8px;
    }

    .goal-amount {
        color: #5DB8C8;
        font-weight: 800;
        font-size: 20px;
    }

    .no-goals {
        color: #7AAEB8;
        font-weight: 600;
        font-size: 15px;
        margin-top: 16px;
    }

    /* Sections */
    .section {
        background: #C2E5ED;
        border: 2px solid #9BCFD8;
        border-radius: 20px;
        padding: 24px;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #A8D8E0;
    }

    h2 {
        font-size: 22px;
        font-weight: 700;
        color: #1A4D5E;
        margin: 0;
    }

    /* Overview Grid */
    .overview-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .overview-card {
        background: #E8F5F8;
        border: 2px solid #A8D8E0;
        border-radius: 16px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .overview-icon {
        font-size: 24px;
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: #C2E5ED;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .overview-content {
        flex: 1;
    }

    .overview-value {
        font-size: 24px;
        font-weight: 800;
        color: #1A4D5E;
        margin-bottom: 4px;
    }

    .overview-label {
        color: #7AAEB8;
        font-size: 14px;
        font-weight: 600;
    }

    /* Responsive */
    @media (max-width: 1200px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .overview-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .dashboard {
            padding: 16px;
            gap: 16px;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }

        .header-main {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
        }

        .header-info {
            justify-content: space-between;
        }

        .info-item {
            align-items: flex-start;
        }

        .overview-grid {
            grid-template-columns: 1fr;
        }
    }
</style>