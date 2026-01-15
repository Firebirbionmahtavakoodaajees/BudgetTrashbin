<script>
	let selectedContributor = '';
	let amount = '';

	// Store contributions history
	let contributions = [
		// This will be populated by your actual data later
	];

	function handleSubmit() {
		if (!amount || !selectedContributor) {
			alert('Sä oot kyl hauska elä ees yritä');
			return;
		}

		// Add new contribution to the list
		contributions = [
			{
				id: Date.now(), // Unique ID
				amount: parseFloat(amount).toFixed(2),
				contributor: selectedContributor,
				date: new Date().toLocaleDateString('fi-FI'),
				time: new Date().toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })
			},
			...contributions // Put newest first
		];

		// Clear form
		amount = '';
		selectedContributor = '';
	}

	// Function to format currency
	function formatCurrency(value) {
		return new Intl.NumberFormat('fi-FI', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 2
		}).format(value);
	}

	// Function to get contributor color
	function getContributorColor(contributor) {
		return contributor === 'elisa' ? '#88C9D4' : '#9BCFD8';
	}
</script>

<div class="page-container">
	<!-- Input Section -->
	<div class="put-in">
		<div class="input-section">
			<input
				placeholder="Enter amount..."
				type="number"
				class="how-much"
				id="inputField"
				bind:value={amount}
				min="0"
				step="0.01"
			/>

			<button class="confirm" id="confirm" on:click={handleSubmit}>
				<div class="button-content">
					<span class="button-text">Add</span>
					<svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 5v14m-7-7h14" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</button>
		</div>

		<div class="radio-selector">
			<p class="selector-label">Who's contributing?</p>
			<div class="radio-options">
				<div class="radio-option">
					<input
						type="radio"
						id="elisa"
						name="contributor"
						value="elisa"
						bind:group={selectedContributor}
					/>
					<label for="elisa">
						<span class="radio-circle"></span>
						<span class="radio-label">Elisa</span>
					</label>
				</div>

				<div class="radio-option">
					<input
						type="radio"
						id="ruiyan"
						name="contributor"
						value="ruiyan"
						bind:group={selectedContributor}
					/>
					<label for="ruiyan">
						<span class="radio-circle"></span>
						<span class="radio-label">Ruiyan</span>
					</label>
				</div>
			</div>
		</div>
	</div>

	<!-- Spreadsheet Section -->
	<div class="spreadsheet-container">
		<div class="spreadsheet-header">
			<h2 class="spreadsheet-title">Contribution History</h2>
			<div class="spreadsheet-stats">
				<span class="stat-item">Total: {formatCurrency(contributions.reduce((sum, item) => sum + parseFloat(item.amount), 0))}</span>
				<span class="stat-divider">•</span>
				<span class="stat-item">Count: {contributions.length}</span>
			</div>
		</div>

		{#if contributions.length === 0}
			<div class="empty-state">
				<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
				</svg>
				<p class="empty-text">No contributions yet</p>
				<p class="empty-subtext">Add your first contribution using the form above</p>
			</div>
		{:else}
			<div class="spreadsheet-table">
				<!-- Table Header -->
				<div class="table-header">
					<div class="header-cell amount-header">
						<span>Amount</span>
						<svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
						</svg>
					</div>
					<div class="header-cell contributor-header">
						<span>Contributor</span>
					</div>
					<div class="header-cell date-header">
						<span>Date & Time</span>
					</div>
				</div>

				<!-- Table Body -->
				<div class="table-body">
					{#each contributions as contribution (contribution.id)}
						<div class="table-row" style="--contributor-color: {getContributorColor(contribution.contributor)}">
							<div class="table-cell amount-cell">
								<span class="amount-value">{formatCurrency(contribution.amount)}</span>
							</div>
							<div class="table-cell contributor-cell">
								<div class="contributor-badge" class:elisa={contribution.contributor === 'elisa'} class:ruiyan={contribution.contributor === 'ruiyan'}>
									<span class="contributor-initial">{contribution.contributor.charAt(0).toUpperCase()}</span>
									<span class="contributor-name">{contribution.contributor.charAt(0).toUpperCase() + contribution.contributor.slice(1)}</span>
								</div>
							</div>
							<div class="table-cell date-cell">
								<div class="date-time">
									<span class="date">{contribution.date}</span>
									<span class="time">{contribution.time}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
        min-height: 100vh;
        padding: 20px;
        box-sizing: border-box;
    }

    .put-in {
        position: relative;
        border: 2px solid #9BCFD8;
        border-radius: 25px;
        width: 100%;
        height: fit-content;
        padding: 24px;
        background: #C2E5ED;
        box-shadow:
                0 8px 20px rgba(155, 207, 216, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
        overflow: hidden;
        flex-shrink: 0; /* Add this line */
    }

    /* Spreadsheet Styles */
    .spreadsheet-container {
        flex: 0 0 auto; /* Changed from flex: 1 to prevent stretching */
        border: 2px solid #9BCFD8;
        border-radius: 25px;
        background: #C2E5ED;
        box-shadow:
                0 8px 20px rgba(155, 207, 216, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
        padding: 24px;
        display: flex;
        flex-direction: column;
        min-height: 300px; /* Minimum height */
        max-height: 600px; /* Maximum height before scrolling */
        overflow: hidden;
    }

    .spreadsheet-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #A8D8E0;
    }

    .spreadsheet-title {
        font-size: 24px;
        font-weight: 700;
        color: #1A4D5E;
        margin: 0;
    }

    .spreadsheet-stats {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #2A6976;
        font-size: 15px;
        font-weight: 600;
    }

    .stat-divider {
        opacity: 0.5;
    }

    /* Table Styles */
    .spreadsheet-table {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #E8F5F8;
        border-radius: 16px;
        overflow: hidden;
        border: 2px solid #A8D8E0;
    }

    .table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background: linear-gradient(135deg, #5DB8C8 0%, #3C8D9C 100%);
        padding: 18px 24px;
        color: white;
        font-weight: 600;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.5px;

    }

    .header-cell {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .sort-icon {
        width: 16px;
        height: 16px;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }

    .header-cell:hover .sort-icon {
        opacity: 1;
    }

    .table-body {
        flex: 1;
        overflow-y: auto;
        max-height: none;
        min-height: 0;
    }

    .table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 18px 24px;
        border-bottom: 1px solid #D9F0F5;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }

    .table-row:hover {
        background-color: #F0F9FB;
        transform: translateX(4px);
    }

    .table-row::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: var(--contributor-color, #5DB8C8);
        border-radius: 0 2px 2px 0;
    }

    .table-cell {
        display: flex;
        align-items: center;
    }

    .amount-cell {
        justify-content: flex-start;
    }

    .amount-value {
        font-size: 18px;
        font-weight: 700;
        color: #1A4D5E;
    }

    .contributor-cell {
        justify-content: flex-start;
    }

    .contributor-badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .contributor-badge.elisa {
        background-color: rgba(136, 201, 212, 0.15);
        color: #2A6976;
        border: 2px solid #88C9D4;
    }

    .contributor-badge.ruiyan {
        background-color: rgba(155, 207, 216, 0.15);
        color: #2A6976;
        border: 2px solid #9BCFD8;
    }

    .contributor-initial {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
    }

    .contributor-badge.elisa .contributor-initial {
        background: #88C9D4;
        color: white;
    }

    .contributor-badge.ruiyan .contributor-initial {
        background: #9BCFD8;
        color: white;
    }

    .date-cell {
        justify-content: flex-start;
    }

    .date-time {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .date {
        font-size: 14px;
        font-weight: 600;
        color: #2A6976;
    }

    .time {
        font-size: 13px;
        color: #7AAEB8;
        font-weight: 500;
    }

    /* Empty State */
    .empty-state {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: #7AAEB8;
        text-align: center;
    }

    .empty-icon {
        width: 64px;
        height: 64px;
        margin-bottom: 20px;
        opacity: 0.5;
    }

    .empty-text {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: #2A6976;
    }

    .empty-subtext {
        font-size: 15px;
        margin: 0;
        opacity: 0.8;
    }

    /* Keep your original styles for put-in component */
    .input-section {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-gap: 16px;
        align-items: center;
        margin-bottom: 24px;
    }

    .how-much {
        height: 56px;
        border: 2px solid #A8D8E0;
        border-radius: 16px;
        background-color: #E8F5F8;
        padding: 0 20px;
        font-size: 17px;
        font-weight: 500;
        color: #1A4D5E;
        transition: all 0.2s ease;
        width: 100%;
        box-sizing: border-box;
    }

    .how-much:focus {
        outline: none;
        border-color: #5DB8C8;
        background-color: #F0F9FB;
        box-shadow: 0 0 0 3px rgba(93, 184, 200, 0.2);
    }

    .how-much::placeholder {
        color: #7AAEB8;
        font-weight: 400;
    }

    .confirm {
        height: 56px;
        width: 120px;
        background: linear-gradient(135deg, #5DB8C8 0%, #3C8D9C 100%);
        border-radius: 16px;
        color: white;
        border: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(93, 184, 200, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .confirm:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(93, 184, 200, 0.4);
        background: linear-gradient(135deg, #3C8D9C 0%, #2A6976 100%);
    }

    .confirm:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(93, 184, 200, 0.3);
    }

    .button-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .button-text {
        font-weight: 600;
    }

    .button-icon {
        width: 20px;
        height: 20px;
        stroke: currentColor;
    }

    .radio-selector {
        padding-top: 24px;
        border-top: 1px solid #A8D8E0;
    }

    .selector-label {
        font-size: 15px;
        font-weight: 600;
        color: #2A6976;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .radio-options {
        display: flex;
        gap: 16px;
    }

    .radio-option {
        flex: 1;
    }

    .radio-option label {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 18px 24px;
        border-radius: 14px;
        background-color: #D9F0F5;
        border: 2px solid #B8E1E8;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .radio-option label:hover {
        background-color: #E8F5F8;
        border-color: #9BCFD8;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(155, 207, 216, 0.2);
    }

    .radio-circle {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #9BCFD8;
        background: white;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .radio-circle::after {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #5DB8C8;
        transform: scale(0);
        transition: transform 0.2s ease;
    }

    .radio-option input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .radio-option input[type="radio"]:checked + label {
        background-color: #E8F5F8;
        border-color: #5DB8C8;
    }

    .radio-option input[type="radio"]:checked + label .radio-circle {
        border-color: #5DB8C8;
        background: white;
    }

    .radio-option input[type="radio"]:checked + label .radio-circle::after {
        transform: scale(1);
    }

    .radio-label {
        font-size: 16px;
        font-weight: 600;
        color: #1A4D5E;
        transition: color 0.2s ease;
    }

    .radio-option input[type="radio"]:checked + label .radio-label {
        color: #2A6976;
        font-weight: 700;
    }

    /* Responsive design */
    @media screen and (max-width: 768px) {
        .page-container {
            padding: 15px;
        }

        .put-in {
            padding: 20px;
        }

        .input-section {
            grid-template-columns: 1fr;
            grid-gap: 12px;
        }

        .confirm {
            width: 100%;
            height: 52px;
        }

        .radio-options {
            flex-direction: column;
            gap: 12px;
        }

        .radio-option label {
            padding: 16px 20px;
        }

        .spreadsheet-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
        }

        .table-header {
            grid-template-columns: 1fr 1fr;
            padding: 16px 20px;
        }

        .table-row {
            grid-template-columns: 1fr 1fr;
            padding: 16px 20px;
        }

        .date-header {
            display: none;
        }

        .date-cell {
            display: none;
        }

        .amount-value {
            font-size: 16px;
        }
    }
</style>