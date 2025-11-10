O StudyDash é um aplicativo desenvolvido em React Native com Expo, voltado à visualização e gerenciamento de dados educacionais de forma prática e intuitiva.
A navegação entre telas é realizada através do Expo Router Drawer, garantindo fluidez e uma experiência de uso moderna.

O projeto foi criado com foco em demonstrar a integração entre armazenamento local, componentização funcional e visualização gráfica de dados, utilizando tecnologias amplamente adotadas no ecossistema React Native.

 Tecnologias e bibliotecas principais

Expo Router Drawer: responsável pela navegação entre as telas Home, Dashboards e Perfil do Usuário.

AsyncStorage e useState: usados na tela de Perfil para armazenar e gerenciar localmente as informações do usuário (nome, e-mail, curso e turma), garantindo persistência entre sessões.

React Native Gifted Charts / SVG Charts: baseados no repositório react-native-svg-charts
, implementam visualizações de dados com gráficos de barras, pizza e área.

Expo Linear Gradient: aplicado para realçar elementos visuais nos gráficos e na interface geral.

React Hooks: usados para controle de estado, callbacks e memorização de dados, otimizando a performance e a experiência de navegação.

 Estrutura e funcionalidades
 **Home

Apresenta os principais painéis de forma descritiva e informativa, servindo como ponto de partida do usuário.
Exibe o logotipo do sistema e uma breve explicação dos dashboards disponíveis.

*Dashboards

Reúne diferentes tipos de gráficos para representar indicadores de cursos, baseados em dados ilustrativos:

Cursos mais Populares: gráfico de pizza que simula os cursos mais acessados.

Conclusões x Desistências: gráfico de área comparando engajamento e evasão.

Nível de Dificuldade: gráfico de barras agrupando acessos por nível (Básico, Intermediário, Avançado).

Cursos por Categoria: gráfico de pizza filtrável por áreas (Dev, Mobile, Data, Design).

Essas seções exemplificam como integrar componentes de visualização dinâmica com dados educacionais.

*Perfil do Usuário

Permite ao usuário inserir, salvar e editar suas informações.
Os dados são armazenados no AsyncStorage, permanecendo disponíveis mesmo após fechar o aplicativo.
Inclui botões para salvar e limpar o perfil local, com feedback visual e alertas de confirmação.

*Objetivo do projeto

Demonstrar de forma prática:

O uso do Expo Router Drawer para navegação hierárquica.

A aplicação de Hooks e AsyncStorage em contexto real.

A integração entre interfaces reativas e gráficos interativos no ambiente mobile.
