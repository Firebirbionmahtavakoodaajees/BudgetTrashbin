<script>
	let selectedContributor = '';
	let amount = '';

	function handleSubmit() {
		if (!amount || !selectedContributor) {
			alert('Sä oot kyl hauska elä ees yritä');
		}
	}
</script>

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

<div class="contributions">
</div>

<style>
    /* DESKTOP STYLES */
    .put-in {
        position: fixed;
        border: 2px solid #9BCFD8;
        border-radius: 24px;
        margin-left: 25px;
        margin-top: 10px;
        width: 80%;
        padding: 24px;
        background: #C2E5ED;
        box-shadow:
                0 8px 20px rgba(155, 207, 216, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-sizing: border-box;
        left: 0;
    }

    .put-in:hover {
        box-shadow:
                0 12px 28px rgba(155, 207, 216, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
        border-color: #88C9D4;
    }

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
        flex-shrink: 0;
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
        box-sizing: border-box;
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
        flex-shrink: 0;
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

    .contributions {
        /* Your existing contributions styling */
    }

    /* MOBILE STYLES - FIXED */
    @media screen and (max-width: 768px) {
        .put-in {
            position: relative;
            width: calc(100% - 30px);
            margin: 10px 15px;
            left: auto;
            padding: 20px;
        }

        .input-section {
            grid-template-columns: 1fr;
            grid-gap: 12px;
        }

        .how-much {
            width: 100%;
            margin: 0;
        }

        .confirm {
            width: 100%;
            height: 52px;
            margin-top: 0;
        }

        .radio-options {
            flex-direction: column;
            gap: 12px;
        }

        .radio-option label {
            padding: 16px 20px;
        }
    }
</style>