<script>
	import './layout.css';
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';

	//Variables

	//Functions
	function goHome() { goto('/'); }
	function goContribution() { goto('/contributions'); }
	function goDreams() { goto('/dreams'); }
	function goSpendings() { goto('/spendings'); }
	function goSettings() { goto(''); }

	// Helper function to check if a specific path is currently loading
	$: isLoading = (path) => $navigating && $navigating.to?.url.pathname === path;
</script>

<link rel="icon" href="static/favicon.png">

<div class="shell">
	<div class="sidebar">
		<button class="home-icon" on:click={goHome}>
			{#if isLoading('/')}
				<div class="loading-wheel">Loading...</div>
			{:else}
				<img src="./assets/home.png" alt="">
			{/if}
		</button>

		<button class="home-icon" on:click={goContribution}>
			{#if isLoading('/contributions')}
				<div class="loading-wheel">Loading...</div>
			{:else}
				<img src="./assets/contributions.png" alt="">
			{/if}
		</button>

		<button class="home-icon" on:click={goDreams}>
			{#if isLoading('/dreams')}
				<div class="loading-wheel">Loading...</div>
			{:else}
				<img src="./assets/dreams.png" alt="">
			{/if}
		</button>

		<button class="home-icon" on:click={goSpendings}>
			{#if isLoading('/spendings')}
				<div class="loading-wheel">Loading...</div>
			{:else}
				<img src="./assets/spendings.png" alt="">
			{/if}

		</button>

		<button class="home-icon">
			<img src="./assets/setting.png" alt="">
		</button>
	</div>

	<div class="main">
		<slot />   <!-- all pages render here -->
	</div>
</div>

<style>
    .shell {
        display: flex;
        height: 100vh;

        ::-webkit-scrollbar {
						display: none;
        }
    }
    .sidebar {
        width: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 5%;
    }
    .home-icon {
        width: 24px;
        cursor: pointer;
    }

    .main {
        flex: 1;
        margin-top: 1dvh;
        background: #C2E5ED;
        min-height: 98dvh;
        margin-right: 1dvw;
        border-radius: 20px;
        border-color: black;
        border-width: 1px;
        padding: 1% 1% 0 0;

        position: relative;
				display: flex;
        flex-direction: row;
        overflow-y: auto;
    }

    :global(html) {
        background: #C2EDD9;
        height: 100dvh;

        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>