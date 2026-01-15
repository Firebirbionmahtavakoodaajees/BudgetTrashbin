<script>
	import { goto } from '$app/navigation';

	function goElisa() { goto('/contributions/Elisa') }
	function goRuiyan() { goto('/contributions/Elisa')}
</script>

<div class="selector">
	<div class="phone">
		<div class="options">
			<div class="option">
				<button class="selector-button" on:click={goElisa}>E</button>
			</div>
			<div class="option">
				<button class="selector-button" on:click={goRuiyan}>R</button>
			</div>
		</div>
	</div>

	<div class="desktop">
		<div class="options">
			<div class="option">
				<button class="selector-button" on:click={goElisa}>Elisa</button>
			</div>
			<div class="option">
				<button class="selector-button" on:click={goRuiyan}>Ruiyan</button>
			</div>
		</div>
	</div>
</div>

<style>
    .selector {
        position: fixed;
        bottom: 20px;
        border: 1px solid black;
        border-radius: 400px;
        height: 30px;
        width: 30dvw;
        margin-left: 31dvw;
    }

		.options {
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 5%;
		}
		.option{
				text-align: center;
				border: 1px solid black;
				border-radius: 30px;
				width: 46%;
				height: 24px;
				margin-top: 2px;
		}
		.option:hover{
				background: black;
		}
		.selector-button{
				width: 100%;
		}

    @media screen and (max-width: 800px) {
        .desktop {
            display: none;
        }
    }
    @media screen and (min-width: 801px) {
        .phone {
            display: none;
        }
    }

</style>