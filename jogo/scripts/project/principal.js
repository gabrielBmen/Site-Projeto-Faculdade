// ==========================================
// VARIÁVEIS GLOBAIS DE ESTADO
// ==========================================
const keys = { a: false, d: false, q: false, " ": false }; 
globalThis.armaEquipada = false; 
let e_pressionado = false;
let isAtirando = false;

// Configurações do Player
const FIRE_RATE = 0.2; 
let cooldownTiro = 0;
globalThis.vidaPlayer = 200; // Vida inicial do Personagem
globalThis.isPlayerDying = false; // Flag para evitar que o Game Over rode várias vezes

// Configurações do Boss 1 (Fase 1)
globalThis.vidaBoss = 1000; 
globalThis.isBossDying = false; 

// Configurações do Boss 2 (Fase 2)
globalThis.vidaBoss2 = 3000; 
globalThis.isBoss2Dying = false; 

// Configurações de Tiro dos Bosses
const BOSS_FIRE_RATE = 0.6;
const BOSS_FIRE_RATE2 = 0.8;  
let cooldownTiroBoss = 0;

// Variável para garantir que as barras iniciem cheias
let inicializouBarras = false;

// ==========================================
// CAPTURA DO TECLADO
// ==========================================
window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = true;
    }

    if (key === "e" && !e_pressionado) {
        e_pressionado = true;
        globalThis.armaEquipada = !globalThis.armaEquipada;
    }
});

window.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
        keys[key] = false;
    }
    if (key === "e") {
        e_pressionado = false;
    }
});

// ==========================================
// INICIALIZAÇÃO DO CONSTRUCT
// ==========================================
runOnStartup(runtime => {
    runtime.addEventListener("beforeprojectstart", () => {
        runtime.addEventListener("tick", () => Tick(runtime));
    });
});

// ==========================================
// LOOP PRINCIPAL (TICK)
// ==========================================
function Tick(runtime) {
    const player = runtime.objects.personagem.getFirstInstance();
    if (!player) return;

    const platform = player.behaviors.Plataforma; 
    if (!platform) return;

    const dt = runtime.dt; 
    const layout = runtime.layout; 

    // --- 0. INICIALIZAR BARRAS DE VIDA ---
    if (!inicializouBarras) {
        // Barras da Fase 1
        const objBarraBoss = runtime.objects.barradevida;
        const objBarraPlayer = runtime.objects.barradevidaper;
        // Barras da Fase 2
        const objBarraBoss2 = runtime.objects.barradevida2;
        const objBarraPlayer2 = runtime.objects.barradevidaper2;

        if (objBarraBoss && objBarraBoss.getFirstInstance()) objBarraBoss.getFirstInstance().setAnimation("barra_cheia");
        if (objBarraPlayer && objBarraPlayer.getFirstInstance()) objBarraPlayer.getFirstInstance().setAnimation("vida_per_cheia");
        
        if (objBarraBoss2 && objBarraBoss2.getFirstInstance()) objBarraBoss2.getFirstInstance().setAnimation("vida_boss2_cheia");
        if (objBarraPlayer2 && objBarraPlayer2.getFirstInstance()) objBarraPlayer2.getFirstInstance().setAnimation("vida_per2_cheia");

        inicializouBarras = true; 
    }

    // --- 1. MOVIMENTAÇÃO DO PLAYER ---
    if (globalThis.vidaPlayer > 0 && !globalThis.isPlayerDying) {
        if (keys["a"]) platform.simulateControl("left");
        if (keys["d"]) platform.simulateControl("right");
    }

    // --- 2. LÓGICA DE TIRO DO PLAYER ---
    if (cooldownTiro > 0) cooldownTiro -= dt;
    isAtirando = (keys["q"] || keys[" "]) && globalThis.armaEquipada && globalThis.vidaPlayer > 0 && !globalThis.isPlayerDying;

    if (isAtirando && cooldownTiro <= 0) {
        const projetilObj = runtime.objects.tiro; 
        if (projetilObj) {
            const xTiro = player.getImagePointX(1); 
            const yTiro = player.getImagePointY(1);
            const tiro = projetilObj.createInstance(player.layer.index, xTiro, yTiro);
            
            if (keys["a"] || player.animationName.includes("esquerda")) {
                tiro.angle = Math.PI; 
            } else {
                tiro.angle = 0; 
            }
            cooldownTiro = FIRE_RATE;
        }
    }

    // --- 3. LÓGICA DE DANOS E DOS BOSSES ---
    const objBoss1 = runtime.objects.InimigoBoss; 
    const boss1 = objBoss1 ? objBoss1.getFirstInstance() : null;

    const objBoss2 = runtime.objects.InimigoBoss2; 
    const boss2 = objBoss2 ? objBoss2.getFirstInstance() : null;

    // A) Player acertando os Bosses
    const objTiro = runtime.objects.tiro;

    if (objTiro) {
        const tirosNaTela = objTiro.instances(); 
        for (const t of tirosNaTela) {
            
            if (t.x < -100 || t.x > layout.width + 100 || t.y < -100 || t.y > layout.height + 100) {
                t.destroy();
                continue; 
            }

            // Acertou o Boss 1
            if (boss1 && t.testOverlap(boss1) && !globalThis.isBossDying) {
                t.destroy(); // DESTRÓI O TIRO PRIMEIRO
                globalThis.vidaBoss -= 10; // APLICA O DANO

                const objBarraVidaBoss = runtime.objects.barradevida; 
                if (objBarraVidaBoss) {
                    const barra = objBarraVidaBoss.getFirstInstance();
                    if (barra) {
                        if (globalThis.vidaBoss > 800) barra.setAnimation("barra_cheia"); 
                        else if (globalThis.vidaBoss > 600) barra.setAnimation("barra_80");
                        else if (globalThis.vidaBoss > 400) barra.setAnimation("barra_60");
                        else if (globalThis.vidaBoss > 200) barra.setAnimation("barra_40");
                        else if (globalThis.vidaBoss > 0) barra.setAnimation("barra_20");
                        else barra.setAnimation("barra_vazia");
                    }
                }

                if (globalThis.vidaBoss <= 0) {
                    globalThis.isBossDying = true; 
                    boss1.setAnimation("explodindo"); 
                    setTimeout(() => { 
                        if (boss1) boss1.destroy(); 
                        
                        // ===== TRANSIÇÃO PARA A FASE 2 =====
                        inicializouBarras = false; // Reseta as barras para a nova fase
                        runtime.goToLayout("Segunda fase"); 
                    }, 1000); 
                }
            }

            // Acertou o Boss 2
            if (boss2 && t.testOverlap(boss2) && !globalThis.isBoss2Dying) {
                t.destroy(); // DESTRÓI O TIRO PRIMEIRO
                globalThis.vidaBoss2 -= 10; // APLICA O DANO

                const objBarraVidaBoss2 = runtime.objects.barradevida2; 
                if (objBarraVidaBoss2) {
                    const barra2 = objBarraVidaBoss2.getFirstInstance();
                    if (barra2) {
                        if (globalThis.vidaBoss2 > 2400) barra2.setAnimation("vida_boss2_cheia"); 
                        else if (globalThis.vidaBoss2 > 1800) barra2.setAnimation("vida_boss2_80");
                        else if (globalThis.vidaBoss2 > 1200) barra2.setAnimation("vida_boss2_60");
                        else if (globalThis.vidaBoss2 > 600) barra2.setAnimation("vida_boss2_40");
                        else if (globalThis.vidaBoss2 > 0) barra2.setAnimation("vida_boss2_20");
                        else barra2.setAnimation("vida_boss2_vazia");
                    }
                }

                if (globalThis.vidaBoss2 <= 0) {
                    globalThis.isBoss2Dying = true; 
                    boss2.setAnimation("explodindo"); 
                    
                    setTimeout(() => { 
                        if (boss2) boss2.destroy(); 

                        // ===== TRANSIÇÃO PARA A TELA DE VITÓRIA =====
                        // Reseta tudo para um futuro novo jogo
                        globalThis.vidaPlayer = 200;
                        globalThis.vidaBoss = 1000;
                        globalThis.vidaBoss2 = 3000; 
                        globalThis.armaEquipada = false;
                        globalThis.isBossDying = false;
                        globalThis.isBoss2Dying = false; 
                        globalThis.isPlayerDying = false; 
                        inicializouBarras = false; 
                        
                        // ⚠️ ATENÇÃO: Troque pelo nome exato da tela de vitória
                        runtime.goToLayout("Fim"); 
                    }, 1000); 
                }
            }
        }
    }

    // B) Bosses atirando no Player
    if (globalThis.vidaPlayer > 0 && !globalThis.isPlayerDying) {
        if (cooldownTiroBoss > 0) cooldownTiroBoss -= dt;

        if (cooldownTiroBoss <= 0) {
            const projBoss1Obj = runtime.objects.tiroBoss; 
            const projBoss2Obj = runtime.objects.tiroBoss2; 
            
            // Ataque do Boss 1 (3 Tiros usando tiroBoss)
            if (boss1 && !globalThis.isBossDying && projBoss1Obj) {
                const anguloExato = Math.atan2(player.y - boss1.y, player.x - boss1.x);
                const angulosSpread = [-0.3, 0, 0.3]; 

                for (let desvio of angulosSpread) {
                    const tBoss = projBoss1Obj.createInstance(boss1.layer.index, boss1.x, boss1.y);
                    tBoss.angle = anguloExato + desvio;
                }
                cooldownTiroBoss = BOSS_FIRE_RATE;
            }
            // Ataque do Boss 2 (5 Tiros usando tiroBoss2)
            else if (boss2 && !globalThis.isBoss2Dying && projBoss2Obj) {
                const anguloExato = Math.atan2(player.y - boss2.y, player.x - boss2.x);
                const angulosSpread = [-0.4, -0.2, 0, 0.2, 0.4]; 

                for (let desvio of angulosSpread) {
                    const tBoss2 = projBoss2Obj.createInstance(boss2.layer.index, boss2.x, boss2.y);
                    tBoss2.angle = anguloExato + desvio;
                }
                cooldownTiroBoss = BOSS_FIRE_RATE2;
            }
        }
    }

    // C) Player tomando dano
    const processarDanoNoPlayer = (objTiroInimigo, danoAmount) => {
        if (!objTiroInimigo) return;

        const tirosNaTela = objTiroInimigo.instances();
        for (const tb of tirosNaTela) {
            if (tb.x < -100 || tb.x > layout.width + 100 || tb.y < -100 || tb.y > layout.height + 100) {
                tb.destroy();
                continue;
            }

            // Checa a colisão com o personagem (Só toma dano se não estiver morrendo)
            if (globalThis.vidaPlayer > 0 && !globalThis.isPlayerDying && tb.testOverlap(player)) {
                
                tb.destroy(); 
                globalThis.vidaPlayer -= danoAmount; 

                // --- ATUALIZA AS BARRAS DE VIDA ---
                const objBarraVidaPlayer = runtime.objects.barradevidaper; 
                if (objBarraVidaPlayer) {
                    const barraP1 = objBarraVidaPlayer.getFirstInstance();
                    if (barraP1) {
                        if (globalThis.vidaPlayer > 160) barraP1.setAnimation("vida_per_cheia"); 
                        else if (globalThis.vidaPlayer > 120) barraP1.setAnimation("vida_per_80");
                        else if (globalThis.vidaPlayer > 80) barraP1.setAnimation("vida_per_60");
                        else if (globalThis.vidaPlayer > 40) barraP1.setAnimation("vida_per_40");
                        else if (globalThis.vidaPlayer > 0) barraP1.setAnimation("vida_per_20");
                        else barraP1.setAnimation("vida_per_vazia");
                    }
                }

                const objBarraVidaPlayer2 = runtime.objects.barradevidaper2; 
                if (objBarraVidaPlayer2) {
                    const barraP2 = objBarraVidaPlayer2.getFirstInstance();
                    if (barraP2) {
                        if (globalThis.vidaPlayer > 160) barraP2.setAnimation("vida_per2_cheia"); 
                        else if (globalThis.vidaPlayer > 120) barraP2.setAnimation("vida_per2_80");
                        else if (globalThis.vidaPlayer > 80) barraP2.setAnimation("vida_per2_60");
                        else if (globalThis.vidaPlayer > 40) barraP2.setAnimation("vida_per2_40");
                        else if (globalThis.vidaPlayer > 0) barraP2.setAnimation("vida_per2_20");
                        else barraP2.setAnimation("vida_per2_vazia");
                    }
                }

                // --- LÓGICA DE GAME OVER UNIVERSAL ---
                if (globalThis.vidaPlayer <= 0 && !globalThis.isPlayerDying) {
                    globalThis.isPlayerDying = true; // Trava para não executar de novo
                    console.log("Game Over! Player morreu.");
                    
                    setTimeout(() => {
                        // Reseta todas as variáveis globais para um novo jogo
                        globalThis.vidaPlayer = 200;
                        globalThis.vidaBoss = 1000;
                        globalThis.vidaBoss2 = 3000; 
                        globalThis.armaEquipada = false;
                        globalThis.isBossDying = false;
                        globalThis.isBoss2Dying = false; 
                        globalThis.isPlayerDying = false; // Libera o player de novo
                        inicializouBarras = false; 
                        
                        runtime.goToLayout("tela inicio"); 
                    }, 1000);
                }
            }
        }
    };

    // Chama a função para testar e aplicar os dois tipos de dano:
    processarDanoNoPlayer(runtime.objects.tiroBoss, 10); // Tiro do boss 1 dá 10 de dano
    processarDanoNoPlayer(runtime.objects.tiroBoss2, 5); // Tiro do boss 2 dá 5 de dano

    // --- 4. LÓGICA DE ANIMAÇÕES DO PLAYER ---
    const isMoving = platform.isMoving;
    const isOnFloor = platform.isOnFloor;
    const vx = platform.vectorX;

    function setAnim(nome) {
        if (player.animationName !== nome) {
            player.setAnimation(nome);
        }
    }

    if (!isOnFloor) return; 

    if (globalThis.vidaPlayer <= 0) return; 

    if (isMoving) {
        if (vx > 0) {
            if (isAtirando) setAnim("correndo atirando");
            else setAnim(globalThis.armaEquipada ? "correndo arma" : "correndo");
        } 
        else if (vx < 0) {
            if (isAtirando) setAnim("correndo atirando esquerda");
            else setAnim(globalThis.armaEquipada ? "correndo esquerda arma" : "correndo esquerda");
        }
    } else {
        if (globalThis.armaEquipada) {
            if (isAtirando) {
                if (player.animationName.includes("esquerda")) setAnim("atirando parado esquerda");
                else setAnim("atirando parado");
            } else {
                if (player.animationName.includes("esquerda")) setAnim("parado armado"); 
                else setAnim("parado armado");
            }
        } else {
            setAnim("parar");
        }
    }
}