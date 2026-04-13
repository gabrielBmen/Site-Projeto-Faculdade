

const scriptsInEvents = {

	async FolhaDoTutorial_Event2_Act1(runtime, localVars)
	{
		const player = runtime.objects.personagem.getFirstInstance();
		
		if (player) {
		    const platform = player.behaviors.Plataforma;
		    
		    if (platform) {
		        // 1. Aplica a força do pulo na física do Construct
		        platform.simulateControl("jump");
		        
		        // 2. Toca a animação correta baseada no estado da arma
		        if (armaEquipada) {
		            player.setAnimation("pular arma");
		        } else {
		            player.setAnimation("pular");
		        }
		    }
		}
	},

	async FolhaDoTutorial_Event3_Act1(runtime, localVars)
	{
		const player = runtime.objects.personagem.getFirstInstance();
		
		if (player) {
		    const platform = player.behaviors.Plataforma;
		    
		    if (platform) {
		        // 1. Aplica a força do pulo na física do Construct
		        platform.simulateControl("jump");
		        
		        // 2. Toca a animação correta baseada no estado da arma
		        if (armaEquipada) {
		            player.setAnimation("pular arma");
		        } else {
		            player.setAnimation("pular");
		        }
		    }
		}
	},

	async PrimeiraFolhaDoBoss_Event1_Act1(runtime, localVars)
	{
		const player = runtime.objects.personagem.getFirstInstance();
		
		if (player) {
		    const platform = player.behaviors.Plataforma;
		    
		    if (platform) {
		        // 1. Aplica a força do pulo na física do Construct
		        platform.simulateControl("jump");
		        
		        // 2. Toca a animação correta baseada no estado da arma
		        if (armaEquipada) {
		            player.setAnimation("pular arma");
		        } else {
		            player.setAnimation("pular");
		        }
		    }
		}
	},

	async PrimeiraFolhaDoBoss_Event2_Act1(runtime, localVars)
	{
		const player = runtime.objects.personagem.getFirstInstance();
		
		if (player) {
		    const platform = player.behaviors.Plataforma;
		    
		    if (platform) {
		        // 1. Aplica a força do pulo na física do Construct
		        platform.simulateControl("jump");
		        
		        // 2. Toca a animação correta baseada no estado da arma
		        if (armaEquipada) {
		            player.setAnimation("pular arma");
		        } else {
		            player.setAnimation("pular");
		        }
		    }
		}
	},

	async FolhaSegundaFase_Event2_Act1(runtime, localVars)
	{
		const player = runtime.objects.personagem.getFirstInstance();
		
		if (player) {
		    const platform = player.behaviors.Plataforma;
		    
		    if (platform) {
		        // 1. Aplica a força do pulo na física do Construct
		        platform.simulateControl("jump");
		        
		        // 2. Toca a animação correta baseada no estado da arma
		        if (armaEquipada) {
		            player.setAnimation("pular arma");
		        } else {
		            player.setAnimation("pular");
		        }
		    }
		}
	},

	async FolhaSegundaFase_Event3_Act1(runtime, localVars)
	{
		const player = runtime.objects.personagem.getFirstInstance();
		
		if (player) {
		    const platform = player.behaviors.Plataforma;
		    
		    if (platform) {
		        // 1. Aplica a força do pulo na física do Construct
		        platform.simulateControl("jump");
		        
		        // 2. Toca a animação correta baseada no estado da arma
		        if (armaEquipada) {
		            player.setAnimation("pular arma");
		        } else {
		            player.setAnimation("pular");
		        }
		    }
		}
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
