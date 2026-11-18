export interface WorldHistoryTopic {
  id: string;
  titulo: string;
  subtitulo: string;
  icone: string;
  detalhes: string[];
  citacaoHistorica?: string;
  fonteHistorica?: string;
}

export interface LessonWorldContext {
  semana: number;
  anoAprox: string;
  imperadorRomano: string;
  governadorLocal: string;
  climaGeopolitico: string;
  fatosMundiais: {
    roma: string;
    orienteMedio: string;
    comercioRotas: string;
    sociedadeCultura: string;
  };
  destaqueImersao: {
    titulo: string;
    descricao: string;
    impactoNaParabola: string;
  };
}

// Visão Geral das 4 Grandes Dimensões do Mundo no Século I (Época de Jesus)
export const PANORAMA_MUNDIAL_SECULO_I: WorldHistoryTopic[] = [
  {
    id: 'imperio-romano',
    titulo: 'O Império Romano sob Tibério César',
    subtitulo: 'A Pax Romana, a Guarda Pretoriana e a Máquina de Guerra',
    icone: 'Landmark',
    detalhes: [
      'Tibério César (14 d.C. – 37 d.C.) reinava como o segundo imperador de Roma, sucessor de César Augusto. A partir de 26 d.C., retirou-se para a ilha de Capri, administrando o império por despachos e cartas imperiais.',
      'Em Roma, o poder executivo de fato ficou nas mãos de Lúcio Élio Sejano, prefeito da Guarda Pretoriana, que promoveu espionagem, expurgos no Senado e hostilidade contra comunidades judaicas até sua queda dramática e execução em 31 d.C.',
      'A Pax Romana garantia estabilidade nas províncias costeiras às custas de pesadas legiões móveis (como a Legio X Fretensis e Legio VI Ferrata estacionadas na vizinha Síria), patrulhamento marítimo contra piratas e julgamentos sumários por rebelião (pena de crucificação para sedição e escravos revoltosos).'
    ],
    citacaoHistorica: '"A pax de Roma não era a tranquilidade da justiça, mas a ordem imutável imposta pela espada do imperador e pelo estandarte da águia."',
    fonteHistorica: 'Tácito, Anais da História Romana'
  },
  {
    id: 'geopolitica-fronteiras',
    titulo: 'Fronteiras e o Confronto com o Império Parta',
    subtitulo: 'Tensões no Rio Eufrates, o Reino Nabateu e a Dinastia Han',
    icone: 'Globe',
    detalhes: [
      'A grande superpotência rival de Roma a leste era o Império Parta (Pártia, dinastia arsácida), além do Rio Eufrates. Qualquer sinal de insurreição na Judeia ou Galileia acendia o alarme em Roma sobre uma possível invasão parta pelo oriente.',
      'Ao sul da Pereia e Judeia situava-se o próspero Reino Nabateu com capital em Petra, esculpida nas rochas. O rei Aretas IV mantinha laços tensos com Herodes Ântipas depois que este repudiou a filha de Aretas para casar-se com Herodias.',
      'No Extremo Oriente, a Dinastia Han Oriental na China (sob o imperador Guangwu de Han) consolidava a paz após o turbulento reinado de Wang Mang, e as caravanas começavam a expandir o comércio de seda que alcançava os portos de Antioquia e Tiro através da Rota da Seda.'
    ],
    citacaoHistorica: '"Entre Roma e o Eufrates repousava o frágil equilíbrio das nações do Levante."',
    fonteHistorica: 'Flávio Josefo, Guerra dos Judeus'
  },
  {
    id: 'economia-tributos',
    titulo: 'Economia, Moeda e a Extorsão Tributária',
    subtitulo: 'Denários com Efígie de César, Publicanos e a Rota do Comércio',
    icone: 'Coins',
    detalhes: [
      'O sistema tributário era uma das maiores fontes de angústia dos judeus. Havia o imposto direto do imperador (tributum soli sobre as terras e tributum capitis por pessoa), pago com o denário romano de prata com o rosto de Tibério.',
      'Além dos tributos imperiais, os publicanos locais arrendavam direitos aduaneiros (portoria) nas estradas e portos do lago, cobrando ágios arbitrários e lucrando sobre artesãos, camponeses e pescadores, sendo considerados traidores odiados pela comunidade.',
      'As grandes estradas comerciais — a Via Maris (Estrada do Mar, ligando o Egito à Síria passando por Cafarnaum) e a Estrada do Rei (pela Pereia) — canalizavam caravanas internacionais de trigo do Egito, bálsamo de Jericó, púrpura fenícia e azeite galileu.'
    ],
    citacaoHistorica: '"Dai, pois, a César o que é de César, e a Deus o que é de Deus."',
    fonteHistorica: 'Evangelho de Mateus 22:21'
  },
  {
    id: 'sociedade-helenismo',
    titulo: 'Cultura Helenística, Filosofia e Religião',
    subtitulo: 'O Grego Koiné, Estoicismo de Séneca e os Quatro Partidos Judaicos',
    icone: 'BookOpen',
    detalhes: [
      'O grego koiné era a língua franca universal da administração comercial, cultura e filosofia em todo o Mediterrâneo Oriental. O latim era o idioma do exército romano, o aramaico era a fala popular dos galileus e o hebraico a língua sagrada dos rolos sinagogais.',
      'Em Roma e nas metrópoles, filósofos estoicos contemporâneos (como o jovem Lúcio Aneu Séneca) ensinavam o dever moral, a impassibilidade diante do destino e a razão cósmica, enquanto Alexandria abrigava Filo, tentando conciliar a Torá com Platão.',
      'Na Palestina, a sociedade judaica dividia-se em 4 facções: os Saduceus (aristocratas do Templo aliados a Roma), os Fariseus (zeladores da Torá oral aguardando o Messias), os Zelotes (guerrilheiros insurretos contra o censo romano) e os Essênios (eremitas ascetas do deserto de Qumran).'
    ],
    citacaoHistorica: '"A Judeia do primeiro século era um caldeirão onde colidiam a glória pagã do mármore de Roma e o fogo eterno da fé de Abraão."',
    fonteHistorica: 'Historiografia do Período do Segundo Templo'
  }
];

// Dados Históricos Mundiais Específicos por Lição / Semana do Currículo
export const LESSON_WORLD_CONTEXT: Record<number, LessonWorldContext> = {
  1: {
    semana: 1,
    anoAprox: '28 d.C.',
    imperadorRomano: 'Tibério César (em Capri, Roma sob Sejano)',
    governadorLocal: 'Pôncio Pilatos (Judeia) e Herodes Ântipas (Galileia)',
    climaGeopolitico: 'Construção da capital helenística de Tiberíades; descontentamento popular contra os herodianos e forte expectativa messiânica libertadora na Galileia.',
    fatosMundiais: {
      roma: 'Tibério isola-se definitivamente em Capri; Sejano consolida controle total sobre o exército pretoriano e a burocracia romana.',
      orienteMedio: 'Herodes Ântipas funda Tiberíades na costa sul do Mar da Galileia em homenagem ao imperador, construída sobre tumbas antigas, sendo evitada por judeus devotos.',
      comercioRotas: 'A Via Maris ferve com mercadores sírios, egípcios e fenícios cruzando Cafarnaum com cereais, peixe salgado galileu e especiarias.',
      sociedadeCultura: 'O grego koiné permeia as cidades da Decápole na margem leste do lago; teatro e ginásios pagãos contrastam frontalmente com as sinagogas rurais.'
    },
    destaqueImersao: {
      titulo: 'A Estratégia das Parábolas sob Vigilância Política',
      descricao: 'Qualquer líder popular que reunisse milhares à beira do lago atraía imediatamente espiões herodianos e informantes de Roma. Falar abertamente de um "Reino" concorrente traria acusação de insurreição.',
      impactoNaParabola: 'As parábolas protegiam a mensagem espiritual contra acusações prematuras de insurreição civil romana, enquanto comunicavam a verdade viva aos discípulos e ouvintes de coração aberto.'
    }
  },
  2: {
    semana: 2,
    anoAprox: '28 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos e Herodes Ântipas',
    climaGeopolitico: 'Crescimento das tensões entre as elites religiosas da Judeia e a liderança popular de Jesus na Galileia.',
    fatosMundiais: {
      roma: 'Roma impõe normas estritas de empréstimos e lealdade às famílias nobres patrícias; dívidas impagáveis levavam à escravidão por dívidas.',
      orienteMedio: 'O denário romano de prata circula como padrão de um dia de salário de um soldado ou trabalhador agrícola livre no império.',
      comercioRotas: 'Rotas de azeite aromático de nardo importado da Índia pelos portos nabateus e alexandrinos chegam às mesas dos cidadãos mais abastados.',
      sociedadeCultura: 'O banquete seguia o padrão greco-romano do triclínio, onde convidados reclinavam-se com etiqueta rígida de lavagem dos pés e unção.'
    },
    destaqueImersao: {
      titulo: 'O Sistema de Dívidas e o Valor do Denário',
      descricao: '500 denários equivaliam a quase dois anos de trabalho livre. No direito romano e no ambiente helenístico, dívidas não honradas resultavam em confisco de terras, venda da família como escravos e execuções sumárias.',
      impactoNaParabola: 'A dívida impagável de 500 denários perdoada instantaneamente pelo credor soava revolucionária e chocante aos convidados da elite no banquete de Simão.'
    }
  },
  3: {
    semana: 3,
    anoAprox: '29 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos (Prefeito)',
    climaGeopolitico: 'A hostilidade secular entre judeus e samaritanos, tolerada e usada por Roma como tática de "dividir para governar".',
    fatosMundiais: {
      roma: 'Roma mantinha destacamentos da infantaria auxiliar estacionados estrategicamente em Sebaste (antiga Samaria) e Cesareia Marítima.',
      orienteMedio: 'A Estrada de Jericó (cerca de 27 km de descida íngreme através do deserto da Judeia) era infame por emboscadas de salteadores e foras-da-lei.',
      comercioRotas: 'Peregrinos judeus da Galileia frequentemente faziam um desvio cansativo pela Pereia para evitar cruzar as cidades samaritanas hostis.',
      sociedadeCultura: 'A lei romana não obrigava assistência ao viajante ferido; a hospitalidade da estalagem exigia pagamento adiantado com moedas de prata.'
    },
    destaqueImersao: {
      titulo: 'O Perigo da Estrada Sangrenta e o Estigma Samaritano',
      descricao: 'A rota entre Jerusalém e Jericó era conhecida como o "Caminho de Sangue" (Adummim). Bandoleiros atacavam viajantes sem escolta armada.',
      impactoNaParabola: 'Fazer de um samaritano (considerado herético e impuro pelas autoridades do Templo) o herói moral que resgata o homem espancado foi um golpe fulminante no preconceito sectário dos fariseus.'
    }
  },
  4: {
    semana: 4,
    anoAprox: '29 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos (Judeia) e Herodes Ântipas (Pereia)',
    climaGeopolitico: 'Roma aperta a cobrança do tributo imperial na província da Judeia; motins esporádicos de descontentamento social.',
    fatosMundiais: {
      roma: 'A expansão dos latifúndios rurais em toda a Itália e províncias romanas concentrava riquezas e celeiros gigantes nas mãos de patrícios.',
      orienteMedio: 'Construção e expansão de grandes celeiros e silos subterrâneos na bacia do Mediterrâneo para estocar safras contra anos de seca e fome.',
      comercioRotas: 'O porto de Cesareia Marítima escoava grãos e vinhos para abastecer as tropas imperiais nas fronteiras da Germânia e do Danúbio.',
      sociedadeCultura: 'O materialismo helenístico pregava a segurança nos bens perecíveis e o banquete farto antes que a morte inevitável chegasse.'
    },
    destaqueImersao: {
      titulo: 'Acumulação de Terras e a Filosofia do Desfrute Epicurista',
      descricao: 'Camponeses na Palestina do século I perdiam suas terras ancestrais para credores e nobres enriquecidos pelo comércio romano.',
      impactoNaParabola: 'O rico insensato que diz à sua alma: "come, bebe e folga" ecoava o lema epicurista popular nas cidades romanas, desmascarado pela soberania divina que requer a alma naquela mesma noite.'
    }
  },
  5: {
    semana: 5,
    anoAprox: '28 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Herodes Ântipas (Tetrarca da Galileia)',
    climaGeopolitico: 'Populações agrárias da Galileia e Planície de Jezreel sobrecarregadas com trabalho braçal sob o sol e solo rochoso.',
    fatosMundiais: {
      roma: 'A agricultura era a base da economia imperial; manuais agrícolas romanos (como os tratados de Varrão e Columela) discutiam a qualidade dos solos.',
      orienteMedio: 'O método de semeadura palestino consistia em semear antes de arar a terra, espalhando as sementes que frequentemente caíam em caminhos pisados ou entre espinhos.',
      comercioRotas: 'O trigo duro da Galileia e o azeite das colinas de Nazaré e Caná abasteciam caravanas rumo às cidades portuárias de Tiro e Sidom.',
      sociedadeCultura: 'Para o agricultor sem acesso a canais de irrigação, a colheita dependia inteiramente das chuvas temporãs e serôdias outorgadas pelo Criador.'
    },
    destaqueImersao: {
      titulo: 'A Paisagem Visual ao Redor do Mar da Galileia',
      descricao: 'Enquanto Jesus falava de um barco na praia, os ouvintes podiam olhar para as encostas de Cafarnaum e enxergar semeadores em pleno trabalho nos socalcos.',
      impactoNaParabola: 'O contraste entre o solo batido pelos passos das legiões e caravanas, as pedras vulcânicas de basalto e a terra fértil tornou o ensinamento imediatamente vívido aos trabalhadores rurais.'
    }
  },
  6: {
    semana: 6,
    anoAprox: '28 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Herodes Ântipas',
    climaGeopolitico: 'A infiltração de elementos helenísticos e espiões na sociedade judaica tradicional.',
    fatosMundiais: {
      roma: 'Leis romanas rígidas sobre a propriedade da terra puniam severamente o crime de "sabotagem de plantações alheias" com a semeadura intencional de ervas daninhas.',
      orienteMedio: 'O joio (Lolium temulentum) assemelhava-se tanto ao trigo durante o crescimento verde que somente no tempo da espiga sua natureza tóxica e escura podia ser distinguida.',
      comercioRotas: 'Mercadores de grãos no Mediterrâneo exigiam inspeção severa contra sementes de joio, que causavam tonturas, vômitos e cegueira temporária.',
      sociedadeCultura: 'A paciência do agricultor aguardando o julgamento final da ceifa contrastava com o ímpeto dos revolucionários que queriam arrancar à força qualquer oposição humana.'
    },
    destaqueImersao: {
      titulo: 'Sabotagem de Safras no Direito Antigo',
      descricao: 'No Império Romano, era comum vizinhos rivais lançarem sementes venenosas nos campos durante a noite por vingança ou disputa de herança de terras.',
      impactoNaParabola: 'A advertência de que o inimigo veio à noite enquanto os homens dormiam retrata uma sabotagem real da época, revelando que a separação final cabe exclusivamente aos anjos e ao Senhor da Ceifa.'
    }
  },
  7: {
    semana: 7,
    anoAprox: '29 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos (Judeia) e Herodes Ântipas (Pereia)',
    climaGeopolitico: 'Crescimento das tensões messiânicas; o banquete escatológico e a expectativa de quem entraria no Reino.',
    fatosMundiais: {
      roma: 'A nobreza imperial de Roma realizava banquetes suntuosos com patronos e clientes (sistema de clientela romana, onde convites eram negociados por favores políticos).',
      orienteMedio: 'O convite formal para grandes ceias exigia duas etapas: um anúncio prévio com meses de antecedência e o chamado imediato no dia quando os animais estivessem assados.',
      comercioRotas: 'A compra de juntas de bois e campos rurais era o principal investimento de aristocratas e sacerdotes enriquecidos que desdenhavam o chamado profético.',
      sociedadeCultura: 'Recusar o segundo chamado no dia do banquete após ter aceitado o primeiro era considerado afronta gravíssima e declaração aberta de inimizade no mundo oriental.'
    },
    destaqueImersao: {
      titulo: 'A Política dos Banquetes e a Rejeição dos Notáveis',
      descricao: 'Nos círculos de elite helenísticos e judaicos, convidados usavam desculpas falsas de negócios e propriedades para demonstrar que seu tempo valia mais que o do anfitrião.',
      impactoNaParabola: 'A ordem do Senhor de trazer para o banquete os pobres, aleijados, cegos e coxos das ruas e valados rompeu totalmente a lógica social da exclusão do Império Romano e do Segundo Templo.'
    }
  },
  8: {
    semana: 8,
    anoAprox: '29 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos',
    climaGeopolitico: 'O conflito das heranças e os jovens judeus atraídos pelo estilo de vida helenístico das grandes cidades da Decápole.',
    fatosMundiais: {
      roma: 'A emancipação precoce de herdeiros no direito romano e grego permitia a jovens patrícios gastar seu patrimônio em cortesãs, jogos e luxos no exterior.',
      orienteMedio: 'A terra distante (provavelmente as cidades da Decápole ou Antioquia da Síria) exibia teatro, templos pagãos, banquetes mundanos e criação de porcos — animais considerados imundos pela Lei de Moisés.',
      comercioRotas: 'A fome cíclica na bacia mediterrânea frequentemente devastava regiões inteiras sem reservas estatais de trigo.',
      sociedadeCultura: 'Para um filho judeu cuidar de porcos e desejar a comida deles (alfarrobas) era a degradação social e espiritual mais extrema imaginável no mundo bíblico.'
    },
    destaqueImersao: {
      titulo: 'A Sedução das Cidades Helenísticas e o Resgate da Graça',
      descricao: 'Muitos jovens judeus da época de Jesus deixavam vilarejos piedosos atraídos pelo brilho cosmopolita de cidades gregas como Cesareia ou Gadara, terminando na ruína moral e financeira.',
      impactoNaParabola: 'O anel de autoridade familiar, as melhores vestes e o beijo do pai antes de qualquer justificativa evidenciam a magnitude incomparável da justificação pela graça de Deus Pai.'
    }
  },
  9: {
    semana: 9,
    anoAprox: '29 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos (Judeia)',
    climaGeopolitico: 'O contraste chocante entre o luxo púrpura da aristocracia romana/saduceia e a miséria das multidões empobrecidas.',
    fatosMundiais: {
      roma: 'O corante púrpura de Tiro (extraído de moluscos murex na costa fenícia) era o tecido mais caro do mundo antigo, privativo de senadores, imperadores e magnatas.',
      orienteMedio: 'O linho fino do Egito (byssus) era utilizado pelos sacerdotes do Templo em Jerusalém e famílias da elite sacerdotal associadas à casa do sumo sacerdote Anás.',
      comercioRotas: 'Os palácios fortificados dos nobres possuíam portões de bronze que isolavam os donos da visão das massas doentes e famintas da cidade.',
      sociedadeCultura: 'Cães vadios nas ruas do mundo antigo eram animais semidomesticados que vasculhavam lixo e lambiam feridas de mendigos sem assistência médica.'
    },
    destaqueImersao: {
      titulo: 'Púrpura Imperial e o Abismo Social no Século I',
      descricao: 'O homem rico vestia-se de púrpura e linho fino — as insígnias exteriores de quem desfrutava dos privilégios do poder romano e do monopólio do Templo.',
      impactoNaParabola: 'Jesus inverte completamente a ordem do mundo: na eternidade, o mendigo que ninguém notava está consolado no seio de Abraão, enquanto o potentado arde em tormentos impagáveis.'
    }
  },
  10: {
    semana: 10,
    anoAprox: '30 d.C. (Início da Primavera)',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos (em Cesareia, preparando-se para subir a Jerusalém)',
    climaGeopolitico: 'A cidade de Jericó como coração fiscal do império; o descontentamento popular contra os cobradores de impostos a serviço de Roma.',
    fatosMundiais: {
      roma: 'O tesouro imperial dependia de cobradores delegados (publicani); no império, fraudes fiscais e subornos eram moeda corrente nas províncias ultramarinas.',
      orienteMedio: 'Jericó era um dos pontos mais lucrativos do império romano no Oriente: controle das exportações mundiais de bálsamo precioso, tâmaras doces e travessias do Rio Jordão.',
      comercioRotas: 'A alfândega de Jericó interceptava caravanas que subiam da Arábia e Pereia em direção a Jerusalém para a Páscoa.',
      sociedadeCultura: 'Os fariseus consideravam os publicanos ritualmente impuros e traidores nacionais da pior espécie, equiparados a ladrões e gentios.'
    },
    destaqueImersao: {
      titulo: 'O Fariseu e o Publicano no Centro de Coleta de Jericó',
      descricao: 'Enquanto o fariseu ostentava suas orações públicas e jejuns duas vezes por semana, o publicano, cúmplice da arrecadação romana, batia no peito reconhecendo-se réu culpado perante a santidade de Deus.',
      impactoNaParabola: 'A declaração de que o publicano desceu justificado para sua casa em vez do líder religioso foi uma bomba teológica que derrubou a autojustiça humana.'
    }
  },
  11: {
    semana: 11,
    anoAprox: '30 d.C. (Semana da Páscoa)',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos e Caifás (Sumo Sacerdote nomeado por Roma)',
    climaGeopolitico: 'A cidade de Jerusalém transborda com mais de 2 milhões de peregrinos na Páscoa; tropas romanas na Fortaleza Antônia em alerta máximo contra insurreições.',
    fatosMundiais: {
      roma: 'O imperador Tibério vigiava atentamente governadores provinciais; qualquer tumulto não contido em festivais religiosos arruinaria a carreira militar de Pilatos.',
      orienteMedio: 'A vinha era o símbolo profético de Israel (Isaías 5), mas as vinhas da Judeia estavam sob controle de famílias nobres ausentes que arrendavam as terras a lavradores locais.',
      comercioRotas: 'Peregrinos de todo o mundo mediterrâneo (Roma, Creta, Ásia Menor, Egito e Mesopotâmia) convergiam para os pátios do Templo.',
      sociedadeCultura: 'Matar o herdeiro para apoderar-se da vinha remetia ao costume das rebeliões rurais onde lavradores tentavam reivindicar a posse da terra caso o proprietário não tivesse herdeiros vivos.'
    },
    destaqueImersao: {
      titulo: 'A Tensão Pré-Crucificação no Templo sob os Olhos dos Centuriões',
      descricao: 'Jesus contou esta parábola dentro das dependências do Templo, diretamente para os príncipes dos sacerdotes e escribas, a poucos metros das sentinelas romanas no alto da Torre Antônia.',
      impactoNaParabola: 'Os líderes religiosos entenderam na hora que a parábola era contra eles: rejeitaram e matariam o Filho unigênito, e o Reino seria transferido a um povo que produza os seus frutos.'
    }
  },
  12: {
    semana: 12,
    anoAprox: '30 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos',
    climaGeopolitico: 'O ceticismo romano sobre a escatologia e o destino do império; o anúncio da destruição do Templo.',
    fatosMundiais: {
      roma: 'O lema imperial "Roma Eterna" prometia durabilidade perpétua, enquanto os profetas proclamavam a ruína iminente das estruturas deste mundo decaído.',
      orienteMedio: 'As procissões noturnas de casamento na Palestina antiga utilizavam tochas de azeite e lâmpadas de cerâmica suspensas para iluminar as ruelas escuras da cidade.',
      comercioRotas: 'O azeite de oliva prensado no Getsêmani (literalmente "prensa de azeite") supria as lâmpadas da capital e o fogo sagrado do candelabro do Templo.',
      sociedadeCultura: 'A chegada do noivo era intencionalmente retardada para testar a prontidão das famílias e das acompanhantes que guiavam a festa de núpcias.'
    },
    destaqueImersao: {
      titulo: 'A Noite Escura e a Espera do Grande Juiz',
      descricao: 'Em contraste com a vigília romana das quatro horas da noite, a vinda do Noivo celestial exige perseverança espiritual inegociável até o romper da aurora.',
      impactoNaParabola: 'A parábola das dez virgens ensina que a graça interior e a unção do Espírito Santo não podem ser transferidas ou compradas de última hora; cada alma comparecerá perante o tribunal divino com seu próprio azeite de fé.'
    }
  },
  13: {
    semana: 13,
    anoAprox: '30 d.C.',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos',
    climaGeopolitico: 'O sistema financeiro do império e a cobrança de contas do Senhor Soberano que regressa com poder.',
    fatosMundiais: {
      roma: 'O talento era a maior unidade monetária do mundo antigo grego e romano. Um único talento de prata equivalia a cerca de 6.000 denários (aproximadamente 20 anos de salários de um operário comum).',
      orienteMedio: 'Banqueiros e cambistas (trapezitai) operavam mesas de câmbio nos pórticos comerciais das cidades greco-romanas, negociando juros e depósitos seguros.',
      comercioRotas: 'Grandes senhores que viajavam para Roma deixavam capitais astronômicos nas mãos de administradores e intendentes libertos para movimentar o comércio marítimo.',
      sociedadeCultura: 'Enterrar moedas e joias na terra era a forma mais segura de ocultar patrimônio durante invasões militares ou saques de salteadores.'
    },
    destaqueImersao: {
      titulo: 'A Imensidão do Talento Imperial e a Prestação de Contas',
      descricao: 'Cinco talentos equivaliam a uma fortuna colossal (cerca de 100 anos de rendimento do trabalho comum), mostrando a magnitude incalculável dos dons e dons espirituais confiados pelo Mestre à Sua Igreja.',
      impactoNaParabola: 'O servo mau e negligente escondeu o talento por medo e visão distorcida do caráter generoso do Senhor, sendo condenado na prestação de contas soberana.'
    }
  },
  14: {
    semana: 14,
    anoAprox: '30 d.C. (Quinta-feira da Paixão)',
    imperadorRomano: 'Tibério César',
    governadorLocal: 'Pôncio Pilatos e Caifás',
    climaGeopolitico: 'As vésperas da crucificação fora dos muros de Jerusalém sob autoridade e execução do exército romano.',
    fatosMundiais: {
      roma: 'A crucificação era o suplício máximo reservado pelo direito romano aos subversivos, rebeldes políticos e escravos revoltosos (insulto sangrento contra a majestade de Roma).',
      orienteMedio: 'O Templo de Jerusalém exibia à entrada do Santuário uma gigantesca videira de ouro maciço com cachos de uvas do tamanho de homens, símbolo do Israel nacional.',
      comercioRotas: 'Os ramos secos das videiras das colinas de Belém e do Monte das Oliveiras eram podados na primavera e recolhidos para alimentar as fogueiras da noite.',
      sociedadeCultura: 'A poda cuidadosa com a podadeira do vinhateiro (limpar os ramos frutíferos para que produzam ainda mais fruto) era a arte mais nobre da agricultura do Levante.'
    },
    destaqueImersao: {
      titulo: 'A Videira Verdadeira Versus o Estandarte da Águia de Roma',
      descricao: 'Na noite em que foi traído, enquanto o pretório de Pilatos e os guardas do Templo já preparavam as tochas para prendê-lo no Getsêmani, Jesus declara: "Eu sou a videira verdadeira, e vós sois os ramos".',
      impactoNaParabola: 'A vida, a força e a salvação do discípulo não emanam do império de César nem da corrupção terrena do Templo, mas da união vital e orgânica com Cristo ressurreto.'
    }
  }
};
