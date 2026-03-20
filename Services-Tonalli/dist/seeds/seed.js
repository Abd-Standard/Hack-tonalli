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
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'tonalli',
    entities: [user_entity_1.User, lesson_entity_1.Lesson, quiz_entity_1.Quiz, progress_entity_1.Progress, nft_certificate_entity_1.NFTCertificate, streak_entity_1.Streak, chapter_entity_1.Chapter],
    synchronize: true,
    logging: false,
    charset: 'utf8mb4',
});
const MODULE_ID = 'mod-intro-blockchain';
const MODULE_NAME = 'Intro a Blockchain';
const LESSON_1_QUESTIONS = [
    {
        id: 'l1q1',
        question: '¿Qué es una blockchain o cadena de bloques?',
        options: [
            'Un tipo de red social',
            'Un registro distribuido e inmutable de transacciones',
            'Un banco digital centralizado',
            'Un lenguaje de programación',
        ],
        correctIndex: 1,
        explanation: 'Una blockchain es un registro distribuido donde los datos se almacenan en bloques enlazados de forma criptográfica.',
    },
    {
        id: 'l1q2',
        question: '¿Cuál es una característica principal de la blockchain?',
        options: [
            'Es controlada por un solo banco',
            'Puede ser modificada fácilmente por cualquiera',
            'Es descentralizada e inmutable',
            'Solo funciona con internet de alta velocidad',
        ],
        correctIndex: 2,
        explanation: 'La descentralización e inmutabilidad son pilares fundamentales: nadie controla los datos y no se pueden alterar.',
    },
    {
        id: 'l1q3',
        question: '¿Qué significa que la blockchain sea "distribuida"?',
        options: [
            'Que está en un solo servidor muy grande',
            'Que múltiples nodos almacenan copias del registro',
            'Que se distribuye dinero automáticamente',
            'Que funciona sin conexión a internet',
        ],
        correctIndex: 1,
        explanation: 'Distribuida significa que muchos computadores (nodos) guardan copias del mismo registro simultáneamente.',
    },
    {
        id: 'l1q4',
        question: '¿Quién inventó Bitcoin, la primera blockchain pública?',
        options: [
            'Elon Musk',
            'Mark Zuckerberg',
            'Satoshi Nakamoto',
            'Bill Gates',
        ],
        correctIndex: 2,
        explanation: 'Satoshi Nakamoto (identidad desconocida) publicó el whitepaper de Bitcoin en 2008.',
    },
    {
        id: 'l1q5',
        question: '¿Qué hace que los bloques estén "encadenados"?',
        options: [
            'Un cable físico entre servidores',
            'Cada bloque contiene el hash del bloque anterior',
            'Un administrador que los enlaza manualmente',
            'Un contrato legal entre nodos',
        ],
        correctIndex: 1,
        explanation: 'Cada bloque incluye el hash criptográfico del bloque anterior, creando una cadena que hace imposible la alteración.',
    },
    {
        id: 'l1q6',
        question: '¿Qué es un "hash" en el contexto de blockchain?',
        options: [
            'Una contraseña de usuario',
            'Una función matemática que genera una huella digital única',
            'El nombre del dueño de un bloque',
            'Un tipo de criptomoneda',
        ],
        correctIndex: 1,
        explanation: 'Un hash es el resultado de una función criptográfica que produce una cadena única para cualquier dato.',
    },
    {
        id: 'l1q7',
        question: '¿Cuál de estas NO es una blockchain conocida?',
        options: ['Ethereum', 'Stellar', 'Solana', 'MySQL'],
        correctIndex: 3,
        explanation: 'MySQL es un sistema de base de datos relacional tradicional, no una blockchain.',
    },
    {
        id: 'l1q8',
        question: '¿Qué son los "smart contracts" (contratos inteligentes)?',
        options: [
            'Contratos físicos digitalizados',
            'Abogados con computadoras',
            'Código que se ejecuta automáticamente en la blockchain',
            'Emails con firma electrónica',
        ],
        correctIndex: 2,
        explanation: 'Los smart contracts son programas que se ejecutan solos cuando se cumplen condiciones predefinidas.',
    },
    {
        id: 'l1q9',
        question: '¿Para qué sirve el "consenso" en blockchain?',
        options: [
            'Para que todos los nodos estén de acuerdo sobre el estado del registro',
            'Para elegir al presidente de la red',
            'Para conectar múltiples blockchains',
            'Para calcular el precio de las criptomonedas',
        ],
        correctIndex: 0,
        explanation: 'El mecanismo de consenso asegura que todos los nodos acuerden cuál es la versión correcta del registro.',
    },
    {
        id: 'l1q10',
        question: '¿Qué es la "descentralización" en blockchain?',
        options: [
            'Que no hay ningún servidor',
            'Que ninguna entidad única tiene control total',
            'Que los datos están en la nube de Amazon',
            'Que solo los gobiernos pueden acceder',
        ],
        correctIndex: 1,
        explanation: 'Descentralización significa que el poder y control se distribuyen entre muchos participantes, sin una autoridad central.',
    },
    {
        id: 'l1q11',
        question: '¿Qué es una "wallet" o billetera crypto?',
        options: [
            'Una app para guardar fotos',
            'Un software que almacena claves para acceder a activos digitales',
            'Una tarjeta de crédito virtual',
            'Un banco en línea',
        ],
        correctIndex: 1,
        explanation: 'Una wallet guarda tus claves criptográficas privadas que te dan acceso a tus activos en la blockchain.',
    },
    {
        id: 'l1q12',
        question: '¿Qué ventaja tiene blockchain vs bases de datos tradicionales?',
        options: [
            'Es más rápida para consultas',
            'Es más barata de mantener',
            'Ofrece transparencia e inmutabilidad sin autoridad central',
            'Puede almacenar más datos',
        ],
        correctIndex: 2,
        explanation: 'La transparencia y la imposibilidad de alterar datos sin consenso son ventajas únicas de blockchain.',
    },
    {
        id: 'l1q13',
        question: '¿Qué es "Proof of Work" (PoW)?',
        options: [
            'Un contrato de trabajo para mineros',
            'Un mecanismo de consenso que requiere resolver puzzles matemáticos',
            'Una forma de pago por trabajo freelance',
            'Un protocolo de seguridad de contraseñas',
        ],
        correctIndex: 1,
        explanation: 'PoW es el mecanismo de consenso de Bitcoin donde los mineros compiten resolviendo puzzles matemáticos complejos.',
    },
    {
        id: 'l1q14',
        question: '¿En qué año se lanzó Bitcoin?',
        options: ['2004', '2009', '2013', '2017'],
        correctIndex: 1,
        explanation: 'Bitcoin fue lanzado en enero de 2009, aunque el whitepaper se publicó en octubre de 2008.',
    },
    {
        id: 'l1q15',
        question: '¿Qué son los "tokens" en blockchain?',
        options: [
            'Monedas físicas digitalizadas',
            'Activos digitales creados sobre una blockchain existente',
            'Contraseñas de un solo uso',
            'Servidores de validación',
        ],
        correctIndex: 1,
        explanation: 'Los tokens son activos digitales creados usando protocolos de blockchain existentes, como los tokens ERC-20 en Ethereum.',
    },
];
const LESSON_2_QUESTIONS = [
    {
        id: 'l2q1',
        question: '¿En qué año fue fundada la red Stellar?',
        options: ['2009', '2012', '2014', '2018'],
        correctIndex: 2,
        explanation: 'Stellar fue fundada en 2014 por Jed McCaleb y Joyce Kim, después de que Jed dejara Ripple.',
    },
    {
        id: 'l2q2',
        question: '¿Cuál es la criptomoneda nativa de Stellar?',
        options: ['ETH', 'BTC', 'XLM', 'SOL'],
        correctIndex: 2,
        explanation: 'XLM (Lumen) es la criptomoneda nativa de la red Stellar, usada para pagar comisiones de transacción.',
    },
    {
        id: 'l2q3',
        question: '¿Cuál es el mecanismo de consenso de Stellar?',
        options: [
            'Proof of Work (PoW)',
            'Proof of Stake (PoS)',
            'Stellar Consensus Protocol (SCP)',
            'Delegated Proof of Stake (DPoS)',
        ],
        correctIndex: 2,
        explanation: 'Stellar usa el SCP, un protocolo basado en Federated Byzantine Agreement (FBA) que es eficiente y verde.',
    },
    {
        id: 'l2q4',
        question: '¿Cuánto tiempo tarda aproximadamente una transacción en Stellar?',
        options: ['10 minutos', '1 hora', '3-5 segundos', '1 día'],
        correctIndex: 2,
        explanation: 'Stellar confirma transacciones en 3-5 segundos, haciéndola ideal para pagos y remesas.',
    },
    {
        id: 'l2q5',
        question: '¿Cuál es el costo aproximado de una transacción en Stellar?',
        options: ['$10 USD', '$1 USD', '$0.01 USD', '$0.0000001 USD'],
        correctIndex: 3,
        explanation: 'Las comisiones en Stellar son extremadamente bajas, alrededor de 0.00001 XLM (fracciones de centavo).',
    },
    {
        id: 'l2q6',
        question: '¿Para qué está principalmente diseñada la red Stellar?',
        options: [
            'Para crear NFTs de arte digital',
            'Para pagos internacionales y remesas de bajo costo',
            'Para videojuegos blockchain',
            'Para almacenamiento de datos descentralizado',
        ],
        correctIndex: 1,
        explanation: 'Stellar fue diseñada para facilitar transferencias de valor entre fronteras de forma rápida y económica.',
    },
    {
        id: 'l2q7',
        question: '¿Qué es la Stellar Development Foundation (SDF)?',
        options: [
            'Un banco central de criptomonedas',
            'La organización sin fines de lucro que desarrolla y mantiene Stellar',
            'Un fondo de inversión en cripto',
            'El gobierno de la blockchain',
        ],
        correctIndex: 1,
        explanation: 'La SDF es una organización sin fines de lucro dedicada a desarrollar y promover el protocolo Stellar.',
    },
    {
        id: 'l2q8',
        question: '¿Qué permite Stellar además de enviar XLM?',
        options: [
            'Solo enviar XLM nativo',
            'Crear y negociar activos personalizados (tokens)',
            'Minería de datos',
            'Hosting de sitios web',
        ],
        correctIndex: 1,
        explanation: 'Stellar permite crear tokens personalizados que pueden representar cualquier activo: dólares, pesos, acciones, NFTs, etc.',
    },
    {
        id: 'l2q9',
        question: '¿Qué es una "anchor" (ancla) en el ecosistema Stellar?',
        options: [
            'Un tipo de nodo validador',
            'Una entidad que conecta activos del mundo real con la blockchain',
            'El elemento más pesado en la blockchain',
            'Un tipo de wallet fría',
        ],
        correctIndex: 1,
        explanation: 'Las anchors son instituciones que emiten tokens respaldados por activos reales (como USD) en la red Stellar.',
    },
    {
        id: 'l2q10',
        question: '¿Qué es Stellar Horizon?',
        options: [
            'El nombre del consenso de Stellar',
            'La API que permite interactuar con la red Stellar',
            'El explorador de transacciones',
            'La wallet oficial de Stellar',
        ],
        correctIndex: 1,
        explanation: 'Horizon es la API HTTP de Stellar que actúa como interfaz entre tu aplicación y los nodos del core de Stellar.',
    },
    {
        id: 'l2q11',
        question: '¿Cuántos XLM se necesitan para activar una cuenta Stellar?',
        options: ['0 XLM', '1 XLM', '10 XLM', '100 XLM'],
        correctIndex: 1,
        explanation: 'Se necesita un balance mínimo de 1 XLM (la "reserva base") para activar y mantener una cuenta Stellar.',
    },
    {
        id: 'l2q12',
        question: '¿Qué es el "Friendbot" de Stellar?',
        options: [
            'Un bot de redes sociales de Stellar',
            'Un servicio que fondea cuentas en la red de pruebas (testnet)',
            'Un asistente de atención al cliente',
            'Un validador automático',
        ],
        correctIndex: 1,
        explanation: 'Friendbot es un servicio gratuito que fondea cuentas en el testnet de Stellar con 10,000 XLM de prueba.',
    },
    {
        id: 'l2q13',
        question: '¿Qué son los "Soroban smart contracts"?',
        options: [
            'Contratos del gobierno para Stellar',
            'La plataforma de contratos inteligentes de Stellar',
            'Tokens NFT de Stellar',
            'Un tipo de wallet multi-firma',
        ],
        correctIndex: 1,
        explanation: 'Soroban es la plataforma de smart contracts de Stellar, escrita en Rust, lanzada en 2024.',
    },
    {
        id: 'l2q14',
        question: '¿Qué empresa usa Stellar para pagos internacionales?',
        options: [
            'PayPal',
            'MoneyGram (en colaboración con Stellar)',
            'Visa',
            'Western Union',
        ],
        correctIndex: 1,
        explanation: 'MoneyGram se asoció con Stellar para facilitar pagos internacionales usando USDC en la red Stellar.',
    },
    {
        id: 'l2q15',
        question: '¿Qué es una "keypair" en Stellar?',
        options: [
            'Un par de wallets conectadas',
            'Un par de llaves: pública (dirección) y privada (secreto)',
            'Dos transacciones relacionadas',
            'Un tipo de token especial',
        ],
        correctIndex: 1,
        explanation: 'Un keypair es el par de clave pública (tu dirección) y clave privada (tu secreto), esencial para operar en Stellar.',
    },
];
const LESSON_3_QUESTIONS = [
    {
        id: 'l3q1',
        question: '¿Qué es una clave pública en una wallet crypto?',
        options: [
            'Tu contraseña secreta',
            'Tu dirección que puedes compartir para recibir fondos',
            'El PIN de tu tarjeta',
            'El nombre de usuario de tu exchange',
        ],
        correctIndex: 1,
        explanation: 'La clave pública es como tu número de cuenta bancaria: puedes compartirla para recibir pagos.',
    },
    {
        id: 'l3q2',
        question: '¿Qué NUNCA debes compartir con nadie?',
        options: [
            'Tu dirección pública (clave pública)',
            'Tu nombre de usuario',
            'Tu clave privada o frase semilla',
            'El nombre de tu blockchain favorita',
        ],
        correctIndex: 2,
        explanation: 'Tu clave privada o frase semilla es el acceso total a tus fondos. Compartirla significa perderlos.',
    },
    {
        id: 'l3q3',
        question: '¿Qué es una "seed phrase" o frase semilla?',
        options: [
            'La contraseña de tu exchange',
            '12-24 palabras que permiten recuperar tu wallet',
            'Un código para recibir criptomonedas gratis',
            'El nombre de tu primer NFT',
        ],
        correctIndex: 1,
        explanation: 'La seed phrase es un respaldo mnemónico de tu clave privada. Quién la tenga, tiene acceso a todos tus fondos.',
    },
    {
        id: 'l3q4',
        question: '¿Qué tipo de wallet es más segura para grandes cantidades?',
        options: [
            'Wallet en exchange (custodial)',
            'Wallet en app del celular (hot wallet)',
            'Hardware wallet / cold wallet (Ledger, Trezor)',
            'Wallet en extensión de navegador',
        ],
        correctIndex: 2,
        explanation: 'Las hardware wallets guardan tus claves offline, protegiéndolas de ataques en línea.',
    },
    {
        id: 'l3q5',
        question: '¿Qué es una wallet "custodial"?',
        options: [
            'Una wallet donde tú controlas tus claves privadas',
            'Una wallet donde un tercero (exchange) guarda tus claves',
            'Una wallet para guardar custodios',
            'Una wallet sin contraseña',
        ],
        correctIndex: 1,
        explanation: 'En una wallet custodial (como en exchanges), el tercero guarda tus claves. "Not your keys, not your coins."',
    },
    {
        id: 'l3q6',
        question: '¿Qué hace Tonalli con la wallet de sus usuarios?',
        options: [
            'No crea wallets, usa exchanges',
            'Crea automáticamente una wallet Stellar sin que el usuario sepa cripto',
            'Pide al usuario que compre XLM primero',
            'Usa la misma wallet para todos los usuarios',
        ],
        correctIndex: 1,
        explanation: 'Tonalli crea una wallet Stellar automáticamente al registrarte, fondeada con XLM de testnet para recompensas.',
    },
    {
        id: 'l3q7',
        question: '¿Cómo se llama la red de pruebas de Stellar?',
        options: ['Mainnet', 'Devnet', 'Testnet', 'Sandbox'],
        correctIndex: 2,
        explanation: 'El Testnet de Stellar es una red de pruebas donde puedes experimentar con XLM sin valor real.',
    },
    {
        id: 'l3q8',
        question: '¿Qué recibes al completar una lección en Tonalli?',
        options: [
            'Solo puntos internos de la app',
            'XP, XLM de recompensa y un NFT certificado en blockchain',
            'Dinero real en tu cuenta bancaria',
            'Un diploma en papel',
        ],
        correctIndex: 1,
        explanation: 'Tonalli recompensa con XP (gamificación), XLM (cripto real en testnet) y un NFT certificado de la lección.',
    },
    {
        id: 'l3q9',
        question: '¿Qué es un NFT (Non-Fungible Token)?',
        options: [
            'Una criptomoneda como Bitcoin',
            'Un token único e irrepetible en la blockchain',
            'Un tipo de contrato inteligente',
            'Una wallet de múltiples firmas',
        ],
        correctIndex: 1,
        explanation: 'Un NFT es un token único y no intercambiable que prueba propiedad o autenticidad de un activo digital.',
    },
    {
        id: 'l3q10',
        question: '¿Qué datos componen una transacción en Stellar?',
        options: [
            'Solo el monto de XLM',
            'Origen, destino, monto, comisión y firma digital',
            'Email y contraseña del usuario',
            'Solo la firma del banco',
        ],
        correctIndex: 1,
        explanation: 'Una transacción Stellar incluye cuenta origen, destino, monto, fee y debe ser firmada con la clave privada.',
    },
    {
        id: 'l3q11',
        question: '¿Qué es "manage_data" en Stellar?',
        options: [
            'Una app para gestionar datos personales',
            'Una operación que guarda datos arbitrarios en una cuenta',
            'El panel de control de Stellar',
            'Una forma de eliminar transacciones',
        ],
        correctIndex: 1,
        explanation: 'manage_data es una operación de Stellar que permite almacenar hasta 64 bytes de datos en una cuenta, útil para NFTs.',
    },
    {
        id: 'l3q12',
        question: '¿Qué significa "GABC..." al inicio de una dirección Stellar?',
        options: [
            'Que es una cuenta de gobierno',
            'Es simplemente el formato Base32 de las claves públicas Stellar',
            'Que la cuenta está verificada',
            'Que es una cuenta de empresa',
        ],
        correctIndex: 1,
        explanation: 'Las claves públicas Stellar comienzan con "G" y están codificadas en Base32. Las claves privadas comienzan con "S".',
    },
    {
        id: 'l3q13',
        question: '¿Qué es el "Stellar Expert"?',
        options: [
            'Un certificado de conocimiento Stellar',
            'Un explorador de bloques para ver transacciones en Stellar',
            'Un asesor financiero de cripto',
            'El wallet oficial de Stellar',
        ],
        correctIndex: 1,
        explanation: 'Stellar Expert (stellar.expert) es un explorador de bloques donde puedes ver transacciones, cuentas y activos en Stellar.',
    },
    {
        id: 'l3q14',
        question: '¿Qué es el "balance mínimo" en una cuenta Stellar?',
        options: [
            'El mínimo para hacer una transacción',
            'La reserva de XLM que siempre debe existir en la cuenta',
            'El costo de crear la wallet',
            'El máximo que puedes guardar',
        ],
        correctIndex: 1,
        explanation: 'Stellar requiere una reserva base de ~1 XLM que siempre debe permanecer en la cuenta para mantenerla activa.',
    },
    {
        id: 'l3q15',
        question: '¿Qué personaje de Tonalli es un xoloescuincle?',
        options: ['Chima', 'Alli', 'Xollo', 'Stella'],
        correctIndex: 2,
        explanation: 'Xollo es el xoloescuincle (perro sin pelo mexicano) mascota de Tonalli, guía en las lecciones interactivas.',
    },
];
async function seed() {
    console.log('🌱 Starting Tonalli seed...');
    await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(user_entity_1.User);
    const lessonRepo = AppDataSource.getRepository(lesson_entity_1.Lesson);
    const quizRepo = AppDataSource.getRepository(quiz_entity_1.Quiz);
    const chapterRepo = AppDataSource.getRepository(chapter_entity_1.Chapter);
    const adminEmail = 'admin@tonalli.mx';
    const userEmail = 'demo@tonalli.mx';
    const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
        const adminUser = userRepo.create({
            email: adminEmail,
            username: 'TonalliAdmin',
            displayName: 'Administrador',
            password: await bcrypt.hash('Admin2024!', 10),
            city: 'Ciudad de México',
            role: 'admin',
            xp: 0,
            totalXp: 0,
            currentStreak: 0,
            stellarPublicKey: 'GADMIN_PUBLIC_KEY',
            stellarSecretKey: 'SADMIN_SECRET_KEY',
        });
        await userRepo.save(adminUser);
        console.log('✅ Admin user created: admin@tonalli.mx / Admin2024!');
    }
    const existingUser = await userRepo.findOne({ where: { email: userEmail } });
    if (!existingUser) {
        const demoUser = userRepo.create({
            email: userEmail,
            username: 'CryptoAzteca',
            displayName: 'Crypto Azteca',
            password: await bcrypt.hash('Demo2024!', 10),
            city: 'Guadalajara',
            role: 'user',
            xp: 0,
            totalXp: 0,
            currentStreak: 0,
            stellarPublicKey: 'GDEMO_PUBLIC_KEY',
            stellarSecretKey: 'SDEMO_SECRET_KEY',
        });
        await userRepo.save(demoUser);
        console.log('✅ Demo user created: demo@tonalli.mx / Demo2024!');
    }
    const existingChapters = await chapterRepo.count();
    if (existingChapters === 0) {
        const sampleChapter = chapterRepo.create({
            title: 'Introducción al Blockchain',
            description: 'Aprende los conceptos fundamentales de la tecnología blockchain y por qué está cambiando el mundo.',
            content: `¿Qué es el Blockchain?

Una blockchain (cadena de bloques) es un tipo especial de base de datos distribuida. A diferencia de una base de datos tradicional controlada por una sola empresa, la blockchain es mantenida por miles de computadoras alrededor del mundo.

¿Cómo funciona?

Los datos se organizan en "bloques". Cada bloque contiene:
- Un conjunto de transacciones o información
- Un timestamp (marca de tiempo)
- Un hash del bloque anterior

Esta estructura crea una cadena donde cada bloque depende del anterior, haciendo casi imposible alterar la historia sin que todo el mundo lo note.

¿Por qué es importante?

La blockchain elimina la necesidad de un intermediario (banco, gobierno, empresa) para que dos personas puedan hacer transacciones de forma confiable. Esto tiene aplicaciones en:

• Pagos internacionales (como Stellar)
• Contratos automáticos (Smart Contracts)
• Certificados digitales (NFTs)
• Identidad digital
• Votaciones transparentes

Blockchain en Latinoamérica

En países como México, Argentina y Venezuela, donde la inflación y la falta de acceso bancario son retos reales, el blockchain ofrece alternativas concretas para la inclusión financiera.

Tonalli fue creado para que personas como tú puedan aprender estos conceptos y ganar criptomonedas reales mientras estudian.`,
            moduleTag: 'blockchain',
            order: 1,
            published: true,
            estimatedMinutes: 8,
            xpReward: 50,
        });
        await chapterRepo.save(sampleChapter);
        console.log('✅ Sample chapter created: Introducción al Blockchain');
    }
    const existingLessons = await lessonRepo.count();
    if (existingLessons > 0) {
        console.log(`✅ Lessons already seeded (${existingLessons} found). Skipping lessons.`);
        await AppDataSource.destroy();
        return;
    }
    const lesson1 = lessonRepo.create({
        title: '¿Qué es Blockchain?',
        description: 'Aprende los fundamentos de la tecnología blockchain y por qué está revolucionando las finanzas.',
        moduleId: MODULE_ID,
        moduleName: MODULE_NAME,
        order: 1,
        type: lesson_entity_1.LessonType.READING,
        xpReward: 50,
        xlmReward: '0.5',
        character: 'chima',
        characterDialogue: '¡Hola! Soy Chima. ¡Bienvenido a tu primera lección sobre blockchain! Esta tecnología cambiará el mundo, ¡y tú serás parte del cambio!',
        content: JSON.stringify({
            sections: [
                {
                    title: '¿Qué es una Blockchain?',
                    text: 'Una blockchain (cadena de bloques) es como un libro de contabilidad digital que guarda registros de transacciones de forma permanente y transparente. Imagina un cuaderno donde todos pueden escribir, pero nadie puede borrar ni modificar lo que ya se escribió.',
                    icon: '🔗',
                },
                {
                    title: '¿Cómo funciona?',
                    text: 'Los datos se agrupan en "bloques". Cada bloque contiene información y una huella digital (hash) del bloque anterior, formando una cadena. Esto hace que sea prácticamente imposible alterar la información sin que todos lo noten.',
                    icon: '⛓️',
                },
                {
                    title: '¿Por qué es revolucionaria?',
                    text: 'No necesita un banco o gobierno que la controle. Es descentralizada: miles de computadores en todo el mundo mantienen copias del registro. Si alguien intenta hacer trampa, todos los demás lo detectan automáticamente.',
                    icon: '🌍',
                },
                {
                    title: 'Casos de uso',
                    text: 'Bitcoin usa blockchain para pagos digitales. Ethereum para contratos inteligentes. Stellar para remesas internacionales. Los NFTs para propiedad digital. ¡Y Tonalli para certificar tu aprendizaje!',
                    icon: '💡',
                },
            ],
            keyTerms: [
                { term: 'Bloque', definition: 'Unidad de datos en la cadena' },
                {
                    term: 'Hash',
                    definition: 'Huella digital única de cada bloque',
                },
                {
                    term: 'Nodo',
                    definition: 'Computador que participa en la red',
                },
                {
                    term: 'Descentralización',
                    definition: 'Sin autoridad central de control',
                },
            ],
        }),
    });
    const saved1 = await lessonRepo.save(lesson1);
    const quiz1 = quizRepo.create({
        lessonId: saved1.id,
        questionsPool: JSON.stringify(LESSON_1_QUESTIONS),
        questionsPerAttempt: 10,
        passingScore: 70,
    });
    await quizRepo.save(quiz1);
    console.log(`✅ Lesson 1 created: ${saved1.title}`);
    const lesson2 = lessonRepo.create({
        title: '¿Cómo funciona Stellar?',
        description: 'Descubre por qué Stellar es la blockchain perfecta para pagos y educación financiera en Latinoamérica.',
        moduleId: MODULE_ID,
        moduleName: MODULE_NAME,
        order: 2,
        type: lesson_entity_1.LessonType.READING,
        xpReward: 50,
        xlmReward: '0.5',
        character: 'alli',
        characterDialogue: '¡Qué onda! Soy Alli. Stellar es mi favorita: ¡transacciones en 5 segundos y casi gratis! Te voy a explicar todo.',
        content: JSON.stringify({
            sections: [
                {
                    title: '¿Qué es Stellar?',
                    text: 'Stellar es una red blockchain diseñada para mover dinero rápido y barato entre países. Fue creada en 2014 y hoy procesa millones de transacciones. Su moneda nativa se llama XLM (Lumens).',
                    icon: '⭐',
                },
                {
                    title: 'Velocidad y costo',
                    text: 'Mientras Bitcoin tarda 10 minutos y cobra hasta $50 de comisión, Stellar confirma transacciones en 3-5 segundos con comisiones de 0.00001 XLM (¡menos de un centavo!). Perfecto para remesas a tu familia.',
                    icon: '⚡',
                },
                {
                    title: 'El Protocolo de Consenso Stellar (SCP)',
                    text: 'Stellar no usa minería (no contamina). Usa un sistema de votación entre nodos de confianza llamado SCP. Es rápido, eficiente y ecológico. Todos los nodos llegan a acuerdo en segundos.',
                    icon: '🤝',
                },
                {
                    title: 'Activos y Tokens',
                    text: 'En Stellar puedes crear cualquier tipo de activo digital: pesos mexicanos digitales, dólares, acciones, o NFTs de certificados. Tonalli usa esto para emitir tu certificado cuando completas una lección.',
                    icon: '🪙',
                },
                {
                    title: 'Stellar en el mundo real',
                    text: 'MoneyGram usa Stellar para remesas. Circle emite USDC en Stellar. Varios bancos latinoamericanos están explorando su uso. ¡La infraestructura del futuro financiero ya está aquí!',
                    icon: '🌎',
                },
            ],
            keyTerms: [
                { term: 'XLM', definition: 'Moneda nativa de Stellar' },
                { term: 'SCP', definition: 'Stellar Consensus Protocol' },
                { term: 'Anchor', definition: 'Puente entre dinero real y blockchain' },
                {
                    term: 'Horizon',
                    definition: 'API para interactuar con Stellar',
                },
            ],
        }),
    });
    const saved2 = await lessonRepo.save(lesson2);
    const quiz2 = quizRepo.create({
        lessonId: saved2.id,
        questionsPool: JSON.stringify(LESSON_2_QUESTIONS),
        questionsPerAttempt: 10,
        passingScore: 70,
    });
    await quizRepo.save(quiz2);
    console.log(`✅ Lesson 2 created: ${saved2.title}`);
    const lesson3 = lessonRepo.create({
        title: 'Tu primera wallet',
        description: 'Aprende cómo funciona tu wallet Stellar en Tonalli y qué significa tener activos digitales reales.',
        moduleId: MODULE_ID,
        moduleName: MODULE_NAME,
        order: 3,
        type: lesson_entity_1.LessonType.INTERACTIVE,
        xpReward: 50,
        xlmReward: '0.5',
        character: 'xollo',
        characterDialogue: '¡Guau! Soy Xollo 🐕 ¡Ya tienes una wallet Stellar real! Cuando te registraste en Tonalli, creamos una automáticamente para ti. ¡Aprende cómo usarla!',
        content: JSON.stringify({
            sections: [
                {
                    title: 'Tu wallet ya existe',
                    text: 'Cuando te registraste en Tonalli, creamos automáticamente una wallet Stellar para ti. No necesitas saber nada de cripto para tenerla. ¡Ya eres parte de la blockchain!',
                    icon: '👛',
                    interactive: true,
                    action: 'show_wallet',
                },
                {
                    title: 'Clave pública = Tu dirección',
                    text: 'Tu clave pública (empieza con "G") es como tu número de cuenta. Puedes compartirla para recibir XLM. Es como decirle a alguien tu número para que te haga una transferencia.',
                    icon: '🔑',
                },
                {
                    title: 'Clave privada = Tu contraseña',
                    text: 'Tu clave privada (empieza con "S") es el secreto que nunca debes compartir. Tonalli la guarda segura para ti. Es la que autoriza transacciones en tu nombre.',
                    icon: '🔒',
                },
                {
                    title: 'Tus recompensas en blockchain',
                    text: 'Cada vez que completes una lección, recibirás XLM reales (en testnet para esta demo) y un NFT certificado que quedará para siempre en la blockchain de Stellar. ¡Nadie puede quitártelo!',
                    icon: '🏆',
                },
                {
                    title: 'Ver tus transacciones',
                    text: 'Puedes ver todas tus transacciones en Stellar Expert (stellar.expert). Es un explorador público donde cualquiera puede verificar que tus certificados son auténticos.',
                    icon: '🔍',
                },
            ],
            keyTerms: [
                {
                    term: 'Clave pública',
                    definition: 'Tu dirección para recibir fondos',
                },
                {
                    term: 'Clave privada',
                    definition: 'Tu secreto para autorizar transacciones',
                },
                { term: 'NFT', definition: 'Certificado único en blockchain' },
                {
                    term: 'Testnet',
                    definition: 'Red de pruebas de Stellar',
                },
            ],
        }),
    });
    const saved3 = await lessonRepo.save(lesson3);
    const quiz3 = quizRepo.create({
        lessonId: saved3.id,
        questionsPool: JSON.stringify(LESSON_3_QUESTIONS),
        questionsPerAttempt: 10,
        passingScore: 70,
    });
    await quizRepo.save(quiz3);
    console.log(`✅ Lesson 3 created: ${saved3.title}`);
    console.log('\n🎉 Seed completed successfully!');
    console.log('');
    console.log('👤 USUARIOS CREADOS:');
    console.log('   Admin  → admin@tonalli.mx  / Admin2024!  (role: admin)');
    console.log('   Usuario → demo@tonalli.mx   / Demo2024!   (role: user)');
    console.log('');
    console.log(`📚 Module: "${MODULE_NAME}"`);
    console.log(`📖 3 lessons + 1 chapter created`);
    console.log(`🎯 10 random questions shown per quiz attempt`);
    console.log(`⭐ 50 XP + 0.5 XLM reward per lesson`);
    await AppDataSource.destroy();
}
seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map