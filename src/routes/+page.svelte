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
					<span class="label">Updated</span>
					<span class="value">Just now</span>
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
			<div class="stat-icon">📈</div>
			<div class="stat-content">
				<div class="stat-label">Savings Rate</div>
				<div class="stat-value">{savingsData.savingsRate}%</div>
				<div class="rate-status">
					{#if savingsData.savingsRate >= 20}
						<span class="good">Excellent</span>
					{:else if savingsData.savingsRate >= 10}
						<span class="ok">Good</span>
					{:else}
						<span class="low">Needs work</span>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- 3. Goals Section -->
	<div class="section">
		<div class="section-header">
			<h2>Goals & Dreams</h2>
			<button class="section-action">+ Add</button>
		</div>

		<div class="goals-container">
			{#if goals.length > 0}
				<div class="goals-grid">
					{#each goals as goal, i}
						<div class="goal-card">
							<div class="goal-header">
								<div class="goal-icon">{i + 1}</div>
								<div class="goal-title">
									<h3>{goal.name}</h3>
									<div class="goal-target">{formatCurrency(goal.target)}</div>
								</div>
							</div>
							<div class="goal-progress">
								<div class="progress">
									<div class="progress-fill" style="width: {goal.progress}%"></div>
								</div>
								<div class="goal-stats">
									<div class="goal-saved">{formatCurrency(goal.saved)}</div>
									<div class="goal-left">{goal.daysLeft} days left</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="empty-state">
					<div class="empty-icon">🎯</div>
					<p>No goals set yet</p>
					<button class="btn-primary">Create First Goal</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- 4. Spending & Categories -->
	<div class="section">
		<div class="section-header">
			<h2>Spending Categories</h2>
			<div class="section-sub">This month</div>
		</div>

		<div class="categories-grid">
			{#if categories.length > 0}
				{#each categories as category}
					<div class="category-card">
						<div class="category-header">
							<div class="category-name">{category.name}</div>
							<div class="category-amount">{formatCurrency(category.spent)}</div>
						</div>
						<div class="category-progress">
							<div class="progress">
								<div class="progress-fill" style="width: {category.percentage}%"></div>
							</div>
							<div class="category-stats">
								<span class="used">{category.percentage}% used</span>
								<span class="budget">Budget: {formatCurrency(category.budget)}</span>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="empty-state">
					<div class="empty-icon">📊</div>
					<p>No categories set</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- 5. Recent Activity -->
	<div class="section">
		<div class="section-header">
			<h2>Recent Activity</h2>
			<button class="section-action">View All</button>
		</div>

		<div class="activity-list">
			{#if contributions.length > 0}
				{#each contributions as contribution}
					<div class="activity-item">
						<div class="activity-avatar" class:elisa={contribution.contributor === 'Elisa'} class:ruiyan={contribution.contributor === 'Ruiyan'}>
							{contribution.contributor.charAt(0)}
						</div>
						<div class="activity-details">
							<div class="activity-main">
								<div class="activity-name">{contribution.contributor}</div>
								<div class="activity-amount">{formatCurrency(contribution.amount)}</div>
							</div>
							<div class="activity-meta">
								<div class="activity-date">{contribution.date}</div>
								<div class="activity-time">{contribution.time}</div>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="empty-state">
					<div class="empty-icon">📝</div>
					<p>No recent activity</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- 6. Monthly Overview -->
	<div class="section">
		<div class="section-header">
			<h2>Monthly Overview</h2>
			<div class="section-sub">December 2024</div>
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

    .label {
        color: #7AAEB8;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
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

    /* Rate Status */
    .rate-status {
        margin-top: 16px;
    }

    .rate-status span {
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 14px;
    }

    .good {
        background: rgba(93, 184, 200, 0.2);
        color: #2A6976;
    }

    .ok {
        background: rgba(155, 207, 216, 0.2);
        color: #2A6976;
    }

    .low {
        background: rgba(168, 216, 224, 0.2);
        color: #7AAEB8;
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

    .section-sub {
        color: #7AAEB8;
        font-size: 15px;
        font-weight: 600;
        margin-top: 4px;
    }

    .section-action {
        background: #5DB8C8;
        color: #E8F5F8;
        border: none;
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .section-action:hover {
        background: #3C8D9C;
        transform: translateY(-2px);
    }

    /* Goals Grid */
    .goals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .goal-card {
        background: #E8F5F8;
        border: 2px solid #A8D8E0;
        border-radius: 16px;
        padding: 20px;
    }

    .goal-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
    }

    .goal-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: #5DB8C8;
        color: #E8F5F8;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 18px;
        flex-shrink: 0;
    }

    .goal-title h3 {
        font-size: 18px;
        font-weight: 700;
        color: #1A4D5E;
        margin: 0 0 4px 0;
    }

    .goal-target {
        color: #5DB8C8;
        font-weight: 800;
        font-size: 20px;
    }

    .goal-progress .progress {
        height: 12px;
        margin-bottom: 12px;
    }

    .goal-stats {
        display: flex;
        justify-content: space-between;
        color: #2A6976;
        font-weight: 700;
        font-size: 14px;
    }

    /* Categories Grid */
    .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
    }

    .category-card {
        background: #E8F5F8;
        border: 2px solid #A8D8E0;
        border-radius: 16px;
        padding: 20px;
    }

    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .category-name {
        color: #1A4D5E;
        font-weight: 700;
        font-size: 16px;
    }

    .category-amount {
        color: #2A6976;
        font-weight: 800;
        font-size: 18px;
    }

    .category-progress .progress {
        height: 6px;
        margin-bottom: 12px;
    }

    .category-stats {
        display: flex;
        justify-content: space-between;
        color: #7AAEB8;
        font-size: 13px;
        font-weight: 600;
    }

    /* Activity List */
    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .activity-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: #E8F5F8;
        border-radius: 16px;
        border: 2px solid #D9F0F5;
    }

    .activity-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 20px;
        flex-shrink: 0;
    }

    .activity-avatar.elisa {
        background: #88C9D4;
        color: #E8F5F8;
    }

    .activity-avatar.ruiyan {
        background: #9BCFD8;
        color: #E8F5F8;
    }

    .activity-details {
        flex: 1;
    }

    .activity-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
    }

    .activity-name {
        color: #1A4D5E;
        font-weight: 700;
        font-size: 16px;
    }

    .activity-amount {
        color: #2A6976;
        font-weight: 800;
        font-size: 18px;
    }

    .activity-meta {
        display: flex;
        gap: 12px;
        color: #7AAEB8;
        font-size: 13px;
        font-weight: 600;
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

    /* Empty States */
    .empty-state {
        text-align: center;
        padding: 48px 24px;
    }

    .empty-icon {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
    }

    .empty-state p {
        color: #7AAEB8;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 24px;
    }

    .btn-primary {
        background: #5DB8C8;
        color: #E8F5F8;
        border: none;
        padding: 12px 32px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .btn-primary:hover {
        background: #3C8D9C;
        transform: translateY(-2px);
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

        .goals-grid,
        .categories-grid {
            grid-template-columns: 1fr;
        }
    }
</style>