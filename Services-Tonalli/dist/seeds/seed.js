"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const bcrypt = __importStar(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const lesson_entity_1 = require("../lessons/entities/lesson.entity");
const quiz_entity_1 = require("../lessons/entities/quiz.entity");
const progress_entity_1 = require("../progress/entities/progress.entity");
const nft_certificate_entity_1 = require("../progress/entities/nft-certificate.entity");
const streak_entity_1 = require("../users/entities/streak.entity");
const chapter_entity_1 = require("../chapters/entities/chapter.entity");
const chapter_module_entity_1 = require("../chapters/entities/chapter-module.entity");
const chapter_progress_entity_1 = require("../chapters/entities/chapter-progress.entity");
const weekly_score_entity_1 = require("../podium/entities/weekly-score.entity");
const podium_reward_entity_1 = require("../podium/entities/podium-reward.entity");
const acta_certificate_entity_1 = require("../certificates/entities/acta-certificate.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'tonalli',
    entities: [user_entity_1.User, lesson_entity_1.Lesson, quiz_entity_1.Quiz, progress_entity_1.Progress, nft_certificate_entity_1.NFTCertificate, streak_entity_1.Streak, chapter_entity_1.Chapter, chapter_module_entity_1.ChapterModule, chapter_progress_entity_1.ChapterProgress, weekly_score_entity_1.WeeklyScore, podium_reward_entity_1.PodiumReward, acta_certificate_entity_1.ActaCertificate],
    synchronize: true,
    logging: false,
    charset: 'utf8mb4',
});
const MODULE_ID = 'mod-intro-blockchain';
const MODULE_NAME = 'Intro a Blockchain';
const BLOCKCHAIN_QUESTIONS = [
    { id: 'bq1', question: '¿Qué es una blockchain o cadena de bloques?', options: ['Un tipo de red social', 'Un registro distribuido e inmutable de transacciones', 'Un banco digital centralizado', 'Un lenguaje de programación'], correctIndex: 1, explanation: 'Una blockchain es un registro distribuido donde los datos se almacenan en bloques enlazados de forma criptográfica.' },
    { id: 'bq2', question: '¿Cuál es una característica principal de la blockchain?', options: ['Es controlada por un solo banco', 'Puede ser modificada fácilmente por cualquiera', 'Es descentralizada e inmutable', 'Solo funciona con internet de alta velocidad'], correctIndex: 2, explanation: 'La descentralización e inmutabilidad son pilares fundamentales.' },
    { id: 'bq3', question: '¿Qué significa que la blockchain sea "distribuida"?', options: ['Que está en un solo servidor muy grande', 'Que múltiples nodos almacenan copias del registro', 'Que se distribuye dinero automáticamente', 'Que funciona sin conexión a internet'], correctIndex: 1, explanation: 'Distribuida significa que muchos computadores (nodos) guardan copias del mismo registro.' },
    { id: 'bq4', question: '¿Quién inventó Bitcoin, la primera blockchain pública?', options: ['Elon Musk', 'Mark Zuckerberg', 'Satoshi Nakamoto', 'Bill Gates'], correctIndex: 2, explanation: 'Satoshi Nakamoto publicó el whitepaper de Bitcoin en 2008.' },
    { id: 'bq5', question: '¿Qué hace que los bloques estén "encadenados"?', options: ['Un cable físico entre servidores', 'Cada bloque contiene el hash del bloque anterior', 'Un administrador que los enlaza manualmente', 'Un contrato legal entre nodos'], correctIndex: 1, explanation: 'Cada bloque incluye el hash criptográfico del bloque anterior.' },
    { id: 'bq6', question: '¿Qué es un "hash" en el contexto de blockchain?', options: ['Una contraseña de usuario', 'Una función matemática que genera una huella digital única', 'El nombre del dueño de un bloque', 'Un tipo de criptomoneda'], correctIndex: 1, explanation: 'Un hash es el resultado de una función criptográfica que produce una cadena única.' },
    { id: 'bq7', question: '¿Cuál de estas NO es una blockchain conocida?', options: ['Ethereum', 'Stellar', 'Solana', 'MySQL'], correctIndex: 3, explanation: 'MySQL es un sistema de base de datos relacional, no una blockchain.' },
    { id: 'bq8', question: '¿Qué son los "smart contracts"?', options: ['Contratos físicos digitalizados', 'Abogados con computadoras', 'Código que se ejecuta automáticamente en la blockchain', 'Emails con firma electrónica'], correctIndex: 2, explanation: 'Los smart contracts son programas que se ejecutan solos cuando se cumplen condiciones predefinidas.' },
    { id: 'bq9', question: '¿Para qué sirve el "consenso" en blockchain?', options: ['Para que todos los nodos estén de acuerdo sobre el estado del registro', 'Para elegir al presidente de la red', 'Para conectar múltiples blockchains', 'Para calcular el precio de las criptomonedas'], correctIndex: 0, explanation: 'El mecanismo de consenso asegura que todos los nodos acuerden cuál es la versión correcta.' },
    { id: 'bq10', question: '¿Qué es la "descentralización" en blockchain?', options: ['Que no hay ningún servidor', 'Que ninguna entidad única tiene control total', 'Que los datos están en la nube de Amazon', 'Que solo los gobiernos pueden acceder'], correctIndex: 1, explanation: 'Descentralización significa que el poder se distribuye entre muchos participantes.' },
    { id: 'bq11', question: '¿Qué es una "wallet" o billetera crypto?', options: ['Una app para guardar fotos', 'Un software que almacena claves para acceder a activos digitales', 'Una tarjeta de crédito virtual', 'Un banco en línea'], correctIndex: 1, explanation: 'Una wallet guarda tus claves criptográficas privadas.' },
    { id: 'bq12', question: '¿Qué ventaja tiene blockchain vs bases de datos tradicionales?', options: ['Es más rápida para consultas', 'Es más barata de mantener', 'Ofrece transparencia e inmutabilidad sin autoridad central', 'Puede almacenar más datos'], correctIndex: 2, explanation: 'La transparencia y la imposibilidad de alterar datos sin consenso son ventajas únicas.' },
    { id: 'bq13', question: '¿Qué es "Proof of Work" (PoW)?', options: ['Un contrato de trabajo para mineros', 'Un mecanismo de consenso que requiere resolver puzzles matemáticos', 'Una forma de pago por trabajo freelance', 'Un protocolo de seguridad'], correctIndex: 1, explanation: 'PoW es el mecanismo de consenso de Bitcoin.' },
    { id: 'bq14', question: '¿En qué año se lanzó Bitcoin?', options: ['2004', '2009', '2013', '2017'], correctIndex: 1, explanation: 'Bitcoin fue lanzado en enero de 2009.' },
    { id: 'bq15', question: '¿Qué son los "tokens" en blockchain?', options: ['Monedas físicas digitalizadas', 'Activos digitales creados sobre una blockchain existente', 'Contraseñas de un solo uso', 'Servidores de validación'], correctIndex: 1, explanation: 'Los tokens son activos digitales creados usando protocolos de blockchain existentes.' },
];
const STELLAR_QUESTIONS = [
    { id: 'sq1', question: '¿En qué año fue fundada la red Stellar?', options: ['2009', '2012', '2014', '2018'], correctIndex: 2, explanation: 'Stellar fue fundada en 2014 por Jed McCaleb y Joyce Kim.' },
    { id: 'sq2', question: '¿Cuál es la criptomoneda nativa de Stellar?', options: ['ETH', 'BTC', 'XLM', 'SOL'], correctIndex: 2, explanation: 'XLM (Lumen) es la criptomoneda nativa de Stellar.' },
    { id: 'sq3', question: '¿Cuál es el mecanismo de consenso de Stellar?', options: ['Proof of Work', 'Proof of Stake', 'Stellar Consensus Protocol (SCP)', 'Delegated PoS'], correctIndex: 2, explanation: 'Stellar usa el SCP, basado en Federated Byzantine Agreement.' },
    { id: 'sq4', question: '¿Cuánto tarda una transacción en Stellar?', options: ['10 minutos', '1 hora', '3-5 segundos', '1 día'], correctIndex: 2, explanation: 'Stellar confirma transacciones en 3-5 segundos.' },
    { id: 'sq5', question: '¿Cuál es el costo de una transacción en Stellar?', options: ['$10 USD', '$1 USD', '$0.01 USD', 'Fracciones de centavo'], correctIndex: 3, explanation: 'Las comisiones en Stellar son extremadamente bajas.' },
    { id: 'sq6', question: '¿Para qué está diseñada Stellar?', options: ['NFTs de arte', 'Pagos internacionales y remesas de bajo costo', 'Videojuegos blockchain', 'Almacenamiento descentralizado'], correctIndex: 1, explanation: 'Stellar facilita transferencias de valor entre fronteras.' },
    { id: 'sq7', question: '¿Qué es la Stellar Development Foundation?', options: ['Un banco central cripto', 'Organización sin fines de lucro que desarrolla Stellar', 'Un fondo de inversión', 'El gobierno de la blockchain'], correctIndex: 1, explanation: 'La SDF es una organización sin fines de lucro dedicada a Stellar.' },
    { id: 'sq8', question: '¿Qué permite Stellar además de enviar XLM?', options: ['Solo enviar XLM', 'Crear y negociar activos personalizados (tokens)', 'Minería de datos', 'Hosting de sitios web'], correctIndex: 1, explanation: 'Stellar permite crear tokens que representan cualquier activo.' },
    { id: 'sq9', question: '¿Qué es una "anchor" en Stellar?', options: ['Un nodo validador', 'Una entidad que conecta activos reales con la blockchain', 'El elemento más pesado', 'Un tipo de wallet fría'], correctIndex: 1, explanation: 'Las anchors emiten tokens respaldados por activos reales.' },
    { id: 'sq10', question: '¿Qué es Stellar Horizon?', options: ['El nombre del consenso', 'La API para interactuar con Stellar', 'El explorador de transacciones', 'La wallet oficial'], correctIndex: 1, explanation: 'Horizon es la API HTTP de Stellar.' },
    { id: 'sq11', question: '¿Cuántos XLM se necesitan para activar una cuenta?', options: ['0 XLM', '1 XLM', '10 XLM', '100 XLM'], correctIndex: 1, explanation: 'Se necesita un balance mínimo de 1 XLM.' },
    { id: 'sq12', question: '¿Qué es el "Friendbot" de Stellar?', options: ['Un bot de redes sociales', 'Un servicio que fondea cuentas en testnet', 'Asistente de atención al cliente', 'Un validador automático'], correctIndex: 1, explanation: 'Friendbot fondea cuentas en el testnet con 10,000 XLM de prueba.' },
    { id: 'sq13', question: '¿Qué son los "Soroban smart contracts"?', options: ['Contratos del gobierno', 'La plataforma de smart contracts de Stellar', 'Tokens NFT', 'Wallet multi-firma'], correctIndex: 1, explanation: 'Soroban es la plataforma de smart contracts de Stellar, escrita en Rust.' },
    { id: 'sq14', question: '¿Qué empresa usa Stellar para pagos internacionales?', options: ['PayPal', 'MoneyGram', 'Visa', 'Western Union'], correctIndex: 1, explanation: 'MoneyGram se asoció con Stellar para pagos usando USDC.' },
    { id: 'sq15', question: '¿Qué es una "keypair" en Stellar?', options: ['Un par de wallets', 'Un par de llaves: pública y privada', 'Dos transacciones relacionadas', 'Un tipo de token'], correctIndex: 1, explanation: 'Un keypair es la clave pública (dirección) y la clave privada (secreto).' },
];
const WALLET_QUESTIONS = [
    { id: 'wq1', question: '¿Qué es una clave pública en una wallet?', options: ['Tu contraseña secreta', 'Tu dirección para recibir fondos', 'El PIN de tu tarjeta', 'Tu nombre de usuario'], correctIndex: 1, explanation: 'La clave pública es como tu número de cuenta bancaria.' },
    { id: 'wq2', question: '¿Qué NUNCA debes compartir?', options: ['Tu dirección pública', 'Tu nombre de usuario', 'Tu clave privada o frase semilla', 'Tu blockchain favorita'], correctIndex: 2, explanation: 'Tu clave privada es el acceso total a tus fondos.' },
    { id: 'wq3', question: '¿Qué es una "seed phrase"?', options: ['Contraseña del exchange', '12-24 palabras para recuperar tu wallet', 'Código para cripto gratis', 'Nombre de tu primer NFT'], correctIndex: 1, explanation: 'La seed phrase es un respaldo mnemónico de tu clave privada.' },
    { id: 'wq4', question: '¿Qué wallet es más segura para grandes cantidades?', options: ['Wallet en exchange', 'App del celular', 'Hardware wallet (Ledger, Trezor)', 'Extensión de navegador'], correctIndex: 2, explanation: 'Las hardware wallets guardan claves offline.' },
    { id: 'wq5', question: '¿Qué es una wallet "custodial"?', options: ['Tú controlas tus claves', 'Un tercero guarda tus claves', 'Una wallet para guardar custodios', 'Sin contraseña'], correctIndex: 1, explanation: 'En una wallet custodial, el exchange guarda tus claves.' },
    { id: 'wq6', question: '¿Qué hace Tonalli con la wallet de sus usuarios?', options: ['No crea wallets', 'Crea automáticamente una wallet Stellar', 'Pide comprar XLM primero', 'Usa la misma wallet para todos'], correctIndex: 1, explanation: 'Tonalli crea una wallet Stellar automáticamente al registrarte.' },
    { id: 'wq7', question: '¿Cómo se llama la red de pruebas de Stellar?', options: ['Mainnet', 'Devnet', 'Testnet', 'Sandbox'], correctIndex: 2, explanation: 'El Testnet es la red de pruebas de Stellar.' },
    { id: 'wq8', question: '¿Qué recibes al completar una lección en Tonalli?', options: ['Solo puntos', 'XP, XLM y un NFT certificado', 'Dinero en tu banco', 'Un diploma en papel'], correctIndex: 1, explanation: 'Tonalli recompensa con XP, XLM real y un NFT certificado.' },
    { id: 'wq9', question: '¿Qué es un NFT?', options: ['Una criptomoneda como Bitcoin', 'Un token único e irrepetible en blockchain', 'Un contrato inteligente', 'Una wallet multi-firma'], correctIndex: 1, explanation: 'Un NFT es un token único que prueba propiedad digital.' },
    { id: 'wq10', question: '¿Qué datos tiene una transacción en Stellar?', options: ['Solo el monto', 'Origen, destino, monto, comisión y firma digital', 'Email y contraseña', 'Solo la firma del banco'], correctIndex: 1, explanation: 'Una transacción Stellar incluye cuenta origen, destino, monto, fee y firma.' },
    { id: 'wq11', question: '¿Qué es "manage_data" en Stellar?', options: ['App de datos personales', 'Operación que guarda datos en una cuenta', 'Panel de control', 'Forma de eliminar transacciones'], correctIndex: 1, explanation: 'manage_data permite almacenar hasta 64 bytes de datos en una cuenta.' },
    { id: 'wq12', question: '¿Qué significa "GABC..." al inicio de una dirección Stellar?', options: ['Cuenta de gobierno', 'Formato Base32 de claves públicas Stellar', 'Cuenta verificada', 'Cuenta de empresa'], correctIndex: 1, explanation: 'Las claves públicas Stellar comienzan con "G" y están en Base32.' },
    { id: 'wq13', question: '¿Qué es el "Stellar Expert"?', options: ['Un certificado', 'Un explorador de bloques para Stellar', 'Un asesor financiero', 'La wallet oficial'], correctIndex: 1, explanation: 'Stellar Expert es un explorador de bloques.' },
    { id: 'wq14', question: '¿Qué es el "balance mínimo" en Stellar?', options: ['Mínimo para una transacción', 'Reserva de XLM que siempre debe existir', 'Costo de crear wallet', 'Máximo que puedes guardar'], correctIndex: 1, explanation: 'Stellar requiere una reserva base de ~1 XLM.' },
    { id: 'wq15', question: '¿Qué personaje de Tonalli es un xoloescuincle?', options: ['Chima', 'Alli', 'Xollo', 'Stella'], correctIndex: 2, explanation: 'Xollo es el xoloescuincle mascota de Tonalli.' },
];
async function seed() {
    console.log('🌱 Starting Tonalli seed...');
    await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(user_entity_1.User);
    const lessonRepo = AppDataSource.getRepository(lesson_entity_1.Lesson);
    const quizRepo = AppDataSource.getRepository(quiz_entity_1.Quiz);
    const chapterRepo = AppDataSource.getRepository(chapter_entity_1.Chapter);
    const chapterModuleRepo = AppDataSource.getRepository(chapter_module_entity_1.ChapterModule);
    const adminEmail = 'admin@tonalli.mx';
    const userEmail = 'demo@tonalli.mx';
    const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
        await userRepo.save(userRepo.create({
            email: adminEmail, username: 'TonalliAdmin', displayName: 'Administrador',
            password: await bcrypt.hash('Admin2024!', 10), city: 'Ciudad de México',
            role: 'admin', xp: 0, totalXp: 0, currentStreak: 0, isPremium: true,
        }));
        console.log('✅ Admin user created: admin@tonalli.mx / Admin2024!');
    }
    const existingUser = await userRepo.findOne({ where: { email: userEmail } });
    if (!existingUser) {
        await userRepo.save(userRepo.create({
            email: userEmail, username: 'CryptoAzteca', displayName: 'Crypto Azteca',
            password: await bcrypt.hash('Demo2024!', 10), city: 'Guadalajara',
            role: 'user', xp: 0, totalXp: 0, currentStreak: 0, isPremium: false,
            dateOfBirth: '2000-05-15',
        }));
        console.log('✅ Demo user created: demo@tonalli.mx / Demo2024!');
    }
    const premiumEmail = 'premium@tonalli.mx';
    const existingPremium = await userRepo.findOne({ where: { email: premiumEmail } });
    if (!existingPremium) {
        await userRepo.save(userRepo.create({
            email: premiumEmail, username: 'PremiumUser', displayName: 'Usuario Premium',
            password: await bcrypt.hash('Premium2024!', 10), city: 'Monterrey',
            role: 'user', xp: 500, totalXp: 500, currentStreak: 5, isPremium: true,
            dateOfBirth: '1995-03-20',
        }));
        console.log('✅ Premium user created: premium@tonalli.mx / Premium2024!');
    }
    const existingChapters = await chapterRepo.count();
    if (existingChapters === 0) {
        const bq1 = BLOCKCHAIN_QUESTIONS.slice(0, 5);
        const bq2 = BLOCKCHAIN_QUESTIONS.slice(5, 10);
        const bq3 = BLOCKCHAIN_QUESTIONS.slice(10, 15);
        const sq1 = STELLAR_QUESTIONS.slice(0, 5);
        const sq2 = STELLAR_QUESTIONS.slice(5, 10);
        const sq3 = STELLAR_QUESTIONS.slice(10, 15);
        const wq1 = WALLET_QUESTIONS.slice(0, 5);
        const wq2 = WALLET_QUESTIONS.slice(5, 10);
        const wq3 = WALLET_QUESTIONS.slice(10, 15);
        const ch1 = await chapterRepo.save(chapterRepo.create({
            title: 'Introducción al Blockchain',
            description: 'Aprende los conceptos fundamentales de la tecnología blockchain.',
            moduleTag: 'blockchain', order: 1, published: true, estimatedMinutes: 20, xpReward: 140,
            releaseWeek: '2026-W12',
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch1.id, type: 'lesson', order: 1, title: '¿Qué es Blockchain?',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: '¿Qué es una Blockchain?', text: 'Una blockchain es un registro distribuido e inmutable. Imagina un cuaderno donde todos pueden escribir, pero nadie puede borrar ni modificar lo que ya se escribió.', icon: '🔗' },
                    { title: '¿Cómo funciona?', text: 'Los datos se agrupan en "bloques" enlazados con hashes criptográficos. Cada bloque contiene transacciones, un timestamp y el hash del bloque anterior.', icon: '⛓️' },
                    { title: 'Características principales', text: '• Descentralizada: miles de nodos mantienen copias\n• Inmutable: no se puede alterar el historial\n• Transparente: cualquiera puede verificar\n• Segura: protegida con criptografía', icon: '🔒' },
                ], keyTerms: [
                    { term: 'Bloque', definition: 'Unidad de datos en la cadena' },
                    { term: 'Hash', definition: 'Huella digital única de cada bloque' },
                    { term: 'Nodo', definition: 'Computador que participa en la red' },
                ] }),
            videoUrl: '',
            questionsPool: JSON.stringify(bq1),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch1.id, type: 'lesson', order: 2, title: 'Conceptos avanzados',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: 'Smart Contracts', text: 'Son programas que se ejecutan automáticamente en la blockchain cuando se cumplen condiciones predefinidas. Ethereum los popularizó, pero Stellar también los tiene con Soroban.', icon: '📜' },
                    { title: 'Mecanismos de consenso', text: 'Proof of Work (Bitcoin): mineros resuelven puzzles.\nProof of Stake: validadores apuestan sus monedas.\nSCP (Stellar): votación entre nodos de confianza.', icon: '🤝' },
                    { title: 'Tokens y criptomonedas', text: 'Las criptomonedas son nativas de su blockchain (BTC, XLM). Los tokens se crean sobre blockchains existentes (ERC-20 en Ethereum, activos en Stellar).', icon: '🪙' },
                ], keyTerms: [
                    { term: 'Smart Contract', definition: 'Código auto-ejecutable en blockchain' },
                    { term: 'Consenso', definition: 'Acuerdo entre nodos sobre el estado del registro' },
                    { term: 'Token', definition: 'Activo digital en una blockchain existente' },
                ] }),
            videoUrl: '',
            questionsPool: JSON.stringify(bq2),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch1.id, type: 'lesson', order: 3, title: 'Blockchain en el mundo real',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: 'Blockchain en Latinoamérica', text: 'En México, Argentina y Venezuela, donde la inflación es un reto, blockchain ofrece alternativas para la inclusión financiera. Bitso, Mercado Bitcoin y otras empresas lideran la adopción.', icon: '🇲🇽' },
                    { title: 'Wallets y activos digitales', text: 'Una wallet guarda tus claves criptográficas. Tu clave pública es tu dirección (la puedes compartir). Tu clave privada es tu secreto (NUNCA la compartas).', icon: '👛' },
                    { title: 'El futuro: Web3', text: 'Web3 es la visión de un internet donde los usuarios son dueños de sus datos y activos. NFTs, DeFi, DAOs y metaversos son parte de esta revolución.', icon: '🌐' },
                ], keyTerms: [
                    { term: 'Wallet', definition: 'Software que almacena claves para activos digitales' },
                    { term: 'NFT', definition: 'Token único e irrepetible' },
                    { term: 'DeFi', definition: 'Finanzas descentralizadas' },
                ] }),
            videoUrl: '',
            questionsPool: JSON.stringify(bq3),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch1.id, type: 'final_exam', order: 4, title: 'Examen Final: Blockchain',
            xpReward: 50, passingScore: 80, questionsPerAttempt: 10,
            questionsPool: undefined,
        }));
        console.log('✅ Cap 1: Intro Blockchain (3 módulos x [info+video+quiz] + examen final)');
        const ch2 = await chapterRepo.save(chapterRepo.create({
            title: 'Stellar Network',
            description: 'Descubre por qué Stellar es la blockchain perfecta para pagos en Latinoamérica.',
            moduleTag: 'stellar', order: 2, published: true, estimatedMinutes: 20, xpReward: 140,
            releaseWeek: '2026-W13',
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch2.id, type: 'lesson', order: 1, title: '¿Qué es Stellar?',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: '¿Qué es Stellar?', text: 'Stellar es una red blockchain creada en 2014 para mover dinero rápido y barato entre países. Su moneda nativa es XLM (Lumens).', icon: '⭐' },
                    { title: 'Velocidad y costo', text: 'Transacciones en 3-5 segundos con comisiones de fracciones de centavo. Perfecto para remesas familiares.', icon: '⚡' },
                    { title: 'Stellar Consensus Protocol', text: 'No usa minería. Usa SCP: votación entre nodos de confianza. Rápido, eficiente y ecológico.', icon: '🤝' },
                ], keyTerms: [
                    { term: 'XLM', definition: 'Moneda nativa de Stellar (Lumens)' },
                    { term: 'SCP', definition: 'Stellar Consensus Protocol' },
                ] }),
            videoUrl: '', questionsPool: JSON.stringify(sq1),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch2.id, type: 'lesson', order: 2, title: 'Ecosistema Stellar',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: 'Anchors y tokens', text: 'Las anchors conectan activos reales con Stellar. Puedes crear tokens que representan pesos, dólares o cualquier activo.', icon: '⚓' },
                    { title: 'Horizon API', text: 'Horizon es la API HTTP que permite a las apps interactuar con la red Stellar. Es la puerta de entrada para desarrolladores.', icon: '🔌' },
                    { title: 'Stellar Development Foundation', text: 'La SDF es la organización sin fines de lucro que desarrolla y promueve Stellar globalmente.', icon: '🏛️' },
                ], keyTerms: [
                    { term: 'Anchor', definition: 'Puente entre dinero real y blockchain' },
                    { term: 'Horizon', definition: 'API para interactuar con Stellar' },
                ] }),
            videoUrl: '', questionsPool: JSON.stringify(sq2),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch2.id, type: 'lesson', order: 3, title: 'Soroban y el futuro',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: 'Soroban Smart Contracts', text: 'Soroban es la plataforma de smart contracts de Stellar, escrita en Rust. Permite crear apps descentralizadas sobre Stellar.', icon: '🚀' },
                    { title: 'Stellar en empresas', text: 'MoneyGram usa Stellar para remesas. Circle emite USDC en Stellar. El Friendbot fondea cuentas en testnet gratis.', icon: '🏦' },
                    { title: 'Keypairs y cuentas', text: 'Un keypair es tu clave pública (dirección G...) y privada (secreto S...). Necesitas 1 XLM mínimo para activar una cuenta.', icon: '🔑' },
                ], keyTerms: [
                    { term: 'Soroban', definition: 'Smart contracts de Stellar' },
                    { term: 'Friendbot', definition: 'Servicio de fondeo en testnet' },
                    { term: 'Keypair', definition: 'Par de clave pública y privada' },
                ] }),
            videoUrl: '', questionsPool: JSON.stringify(sq3),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch2.id, type: 'final_exam', order: 4, title: 'Examen Final: Stellar',
            xpReward: 50, passingScore: 80, questionsPerAttempt: 10, questionsPool: undefined,
        }));
        console.log('✅ Cap 2: Stellar Network (3 módulos x [info+video+quiz] + examen final)');
        const ch3 = await chapterRepo.save(chapterRepo.create({
            title: 'Wallets y Seguridad',
            description: 'Aprende cómo funciona tu wallet Stellar y cómo proteger tus activos digitales.',
            moduleTag: 'wallets', order: 3, published: true, estimatedMinutes: 18, xpReward: 140,
            releaseWeek: '2026-W14',
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch3.id, type: 'lesson', order: 1, title: 'Tu primera wallet',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: 'Tu wallet ya existe', text: 'Al registrarte en Tonalli, se creó automáticamente una wallet Stellar para ti. No necesitas saber cripto para tenerla.', icon: '👛' },
                    { title: 'Clave pública vs privada', text: 'Pública (G...): tu dirección, compártela. Privada (S...): tu secreto, NUNCA la compartas. Quien tenga tu clave privada controla tus fondos.', icon: '🔑' },
                    { title: 'Seed phrase', text: '12-24 palabras que permiten recuperar tu wallet. Guárdala en un lugar seguro y offline.', icon: '📝' },
                ], keyTerms: [
                    { term: 'Clave pública', definition: 'Tu dirección para recibir fondos' },
                    { term: 'Clave privada', definition: 'Tu secreto para autorizar transacciones' },
                    { term: 'Seed phrase', definition: 'Respaldo mnemónico de tu wallet' },
                ] }),
            videoUrl: '', questionsPool: JSON.stringify(wq1),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch3.id, type: 'lesson', order: 2, title: 'Tipos de wallets',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: 'Wallets custodial vs non-custodial', text: 'Custodial: un tercero (exchange) guarda tus claves. Non-custodial: tú controlas todo. "Not your keys, not your coins."', icon: '🏦' },
                    { title: 'Hot wallets vs Cold wallets', text: 'Hot: conectadas a internet (apps, extensiones). Cold: offline (Ledger, Trezor). Para grandes cantidades, usa cold wallet.', icon: '🧊' },
                    { title: 'Tonalli y tu wallet', text: 'Tonalli crea una wallet Stellar automáticamente y la fondea en testnet. Tus recompensas en XLM y certificados NFT se guardan aquí.', icon: '🌟' },
                ], keyTerms: [
                    { term: 'Custodial', definition: 'Un tercero guarda tus claves' },
                    { term: 'Cold wallet', definition: 'Wallet offline, más segura' },
                    { term: 'Hot wallet', definition: 'Wallet conectada a internet' },
                ] }),
            videoUrl: '', questionsPool: JSON.stringify(wq2),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch3.id, type: 'lesson', order: 3, title: 'Seguridad y transacciones',
            xpReward: 30, passingScore: 80, questionsPerAttempt: 5,
            content: JSON.stringify({ sections: [
                    { title: 'Transacciones en Stellar', text: 'Cada transacción incluye: origen, destino, monto, comisión y firma digital. Puedes ver todo en Stellar Expert (stellar.expert).', icon: '📊' },
                    { title: 'NFTs y certificados', text: 'Un NFT es un token único en blockchain. Tonalli usa manage_data de Stellar para emitir certificados verificables que nadie puede falsificar.', icon: '🏆' },
                    { title: 'Mejores prácticas', text: '• Nunca compartas tu clave privada\n• Usa autenticación de 2 factores\n• Verifica direcciones antes de enviar\n• Guarda tu seed phrase offline', icon: '✅' },
                ], keyTerms: [
                    { term: 'NFT', definition: 'Token único e irrepetible' },
                    { term: 'manage_data', definition: 'Operación de Stellar para guardar datos' },
                    { term: 'Stellar Expert', definition: 'Explorador de bloques de Stellar' },
                ] }),
            videoUrl: '', questionsPool: JSON.stringify(wq3),
        }));
        await chapterModuleRepo.save(chapterModuleRepo.create({
            chapterId: ch3.id, type: 'final_exam', order: 4, title: 'Examen Final: Wallets',
            xpReward: 50, passingScore: 80, questionsPerAttempt: 10, questionsPool: undefined,
        }));
        console.log('✅ Cap 3: Wallets y Seguridad (3 módulos x [info+video+quiz] + examen final)');
    }
    else {
        console.log(`✅ Chapters already exist (${existingChapters} found). Skipping.`);
    }
    const existingLessons = await lessonRepo.count();
    if (existingLessons === 0) {
        const lesson1 = await lessonRepo.save(lessonRepo.create({
            title: '¿Qué es Blockchain?', description: 'Fundamentos de blockchain.',
            moduleId: MODULE_ID, moduleName: MODULE_NAME, order: 1, type: lesson_entity_1.LessonType.READING,
            xpReward: 50, xlmReward: '0.5', character: 'chima',
            characterDialogue: '¡Hola! Soy Chima. ¡Bienvenido a tu primera lección!',
            content: JSON.stringify({ sections: [{ title: 'Blockchain', text: 'Ver capítulo completo para más info.', icon: '🔗' }] }),
        }));
        await quizRepo.save(quizRepo.create({ lessonId: lesson1.id, questionsPool: JSON.stringify(BLOCKCHAIN_QUESTIONS), questionsPerAttempt: 10, passingScore: 70 }));
        const lesson2 = await lessonRepo.save(lessonRepo.create({
            title: '¿Cómo funciona Stellar?', description: 'Stellar y sus ventajas.',
            moduleId: MODULE_ID, moduleName: MODULE_NAME, order: 2, type: lesson_entity_1.LessonType.READING,
            xpReward: 50, xlmReward: '0.5', character: 'alli',
            characterDialogue: '¡Qué onda! Soy Alli. Stellar es mi favorita.',
            content: JSON.stringify({ sections: [{ title: 'Stellar', text: 'Ver capítulo completo para más info.', icon: '⭐' }] }),
        }));
        await quizRepo.save(quizRepo.create({ lessonId: lesson2.id, questionsPool: JSON.stringify(STELLAR_QUESTIONS), questionsPerAttempt: 10, passingScore: 70 }));
        const lesson3 = await lessonRepo.save(lessonRepo.create({
            title: 'Tu primera wallet', description: 'Cómo funciona tu wallet Stellar.',
            moduleId: MODULE_ID, moduleName: MODULE_NAME, order: 3, type: lesson_entity_1.LessonType.INTERACTIVE,
            xpReward: 50, xlmReward: '0.5', character: 'xollo',
            characterDialogue: '¡Guau! Soy Xollo 🐕 ¡Ya tienes una wallet Stellar!',
            content: JSON.stringify({ sections: [{ title: 'Wallet', text: 'Ver capítulo completo para más info.', icon: '👛' }] }),
        }));
        await quizRepo.save(quizRepo.create({ lessonId: lesson3.id, questionsPool: JSON.stringify(WALLET_QUESTIONS), questionsPerAttempt: 10, passingScore: 70 }));
        console.log('✅ 3 legacy lessons created');
    }
    console.log('\n🎉 Seed completed successfully!');
    console.log('');
    console.log('👤 USUARIOS:');
    console.log('   Admin   → admin@tonalli.mx   / Admin2024!   (role: admin, premium)');
    console.log('   Free    → demo@tonalli.mx    / Demo2024!    (role: user, free)');
    console.log('   Premium → premium@tonalli.mx / Premium2024! (role: user, premium)');
    console.log('');
    console.log('📚 3 Capítulos con 4 módulos cada uno:');
    console.log('   Cap 1: Introducción al Blockchain');
    console.log('   Cap 2: Stellar Network');
    console.log('   Cap 3: Wallets y Seguridad');
    console.log('');
    console.log('🎯 Cada capítulo: Info → Video → Quiz (5 preguntas) → Examen Final (10 preguntas)');
    console.log('❤️ Free: 3 vidas, 24h espera | Premium: ilimitadas');
    console.log('🔀 Preguntas y opciones se mezclan en cada intento');
    await AppDataSource.destroy();
}
seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map