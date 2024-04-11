import "./Projects.css";
import { useState } from "react";

// ICONS
import arrowBack from "../../icons/caret-back-outline.svg";
import arrowForward from "../../icons/caret-forward-outline.svg";
import fillerLogo from "../../icons/logo-firebase.svg"

import CardProject from "./CardProject/CardProject";
import DotsNavigation from "./DotsNavigation/DotsNavigation";

const projectsInfo = [

  {
    title: 'Project*Sample #1',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 3,
  },

  {
    title: 'Project*Sample #2',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 4,
  },
  
  {
    title: 'Project*Sample #3',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 0,
  },

  {
    title: 'Project*Sample #4',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 1,
  },

  {
    title: 'Project*Sample #5',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 2,
  },

];

// FALTA:
// Arranjar solução para não se ver efeito de translate nos cards sem que seja necessário aplicar overflow: hidden em .section-projects

// Verificarmos pq tem um espaço mínimo entre os decks (ativar border em App.css)
// Resolvido desativando align-items: center na classe .main-container--projects
// Edit: não resolveu nada

// Corrigir: deslocamento ao se movimentar clicando no card/pontos está impedindo que continuemos navegação pq provavalmente está esbarrando no width de 120 rem da página

// Adicionar barra de scroll personalizada e que desaparece

// Adicionar scroll ao usarmos touch (se lascou heheheheheh)

// Ao clicarmos em info expadir texto ou outro efeito qualquer para que botão não seja inútil

// Na hora de criar curriculo interativo adicionar mesma cor de fundo do pdf aberto

// Ajuda para problema de clique nos cards, ir em projects.css e ativar cor de fundo na linha 27


const Projects = function() {
  
  const projectsQty = projectsInfo.length;
  const [cardProjectPosition, setCardProjectPosition] = useState({

    // Caso queiramos que dot comece no primeiro ponto mudar pra 0
    currentProject: 2,
    cardTranslateValue: 0,
    currentDeck: 1,
    deckTranslateValue: [0, 0, 0],
    
    // Posição obtida a partir deckTranslateOrder.at(changeDeck) sempre teremos qual a deck temos de incrementar translateValue +/-300 em deckTranslateValue conforme direção.
    // desse jeito moveremos sempre o último deck conforme direção clicada
    // Exemplo: prev.deckTranslateOrder[movement].at(changeDeck) === deck da ponta oposta a ser movido

    // Futuramente pode ser muito importante entender lógica destas duas arrays: basicamente, toda vez que avançavamos currentDeck, precisavámos movimentar deck do outro extremo ao atual, então a solução que encontrei, foi colocar em uma array na posição equivalente ao valor do DeckAtual a posição do deck que precisavámos mover, pela propria lógica de alternância dos valores de decks 0 > 1 > 2 e então repetindo novamente: 0 > 1 > 2 etc, então com esta alternância, buscando com o valor de deck atual a posição na array deckTranslateOrder obteríamos o deck a ser movido, tanto para trás, como para frente

    // Recorte três papéis, coloque-os na posição 0, 1 ,2. Ao chegar no papel 2, como se estivesssemos avançando na seta, repare que precisariamos mover deck 0, então na posição 2 (valor de currentDeck), está o 0 que é o deck a ser movido, e assim sucessivamente, (proximo é deck 0, então nesta posição vai o valor de 1, que [e o próximo a ser movido), espero ter ajudado você no futuro  

    deckTranslateOrder: {
      forward: [1, 2, 0],
      backward: [2, 0, 1],
    },

  });

  const invertNumberSign = function(num) {
    if (num < 0) return Math.abs(num);
    if (num > 0) return -num;
    if (num === 0) return num;
  };


  const determineDirection = function(clickedDeck, currDeck) {

    // Clicou na esquerda
    if (currDeck + clickedDeck === 2 && currDeck === 0) return [0, clickedDeck, 'backward', 300]; 
    if (currDeck + clickedDeck === 3 && currDeck === 2) return [0, clickedDeck, 'backward', 300];
    if (currDeck + clickedDeck === 1 && currDeck === 1) return [0, clickedDeck, 'backward', 300];

    // Clicou no mesmo deck/centro;
    if (currDeck === clickedDeck) return [5, currDeck, 'center', 0];

    // Clicou na direita
    if ( currDeck + clickedDeck === 1 && currDeck === 0) return [10, clickedDeck, 'forward', -300];
    if (currDeck + clickedDeck === 2 && currDeck === 2) return [10, clickedDeck, 'forward', -300];
    if (currDeck + clickedDeck === 3 && currDeck === 1) return [10, clickedDeck, 'forward', -300];

  };

  // Tá bem díficil de ler, dar uma melhorada
  const handleProjectsMovement = function(movement, clickedDeck) {

    // Para frente
    if (movement === 'forward') {
      
      setCardProjectPosition(prev => {

        const previousProject = prev.currentProject;
        const outOfBounds = previousProject + 1 === projectsQty;
        const changeDeck = prev.currentDeck + 1 === 3 ? 0 : prev.currentDeck + 1; 

        return {
          currentProject: outOfBounds ? 0 : previousProject + 1,
          cardTranslateValue: prev.cardTranslateValue - 100,
          currentDeck: outOfBounds ? changeDeck : prev.currentDeck,
          deckTranslateValue: outOfBounds
            ? prev.deckTranslateValue.map((value, index) => {

              const deckToMove = prev.deckTranslateOrder[movement].at(changeDeck);

              if (deckToMove === index) return value + 300;
              if (deckToMove !== index) return value;

            })
            : prev.deckTranslateValue
          ,
          deckTranslateOrder: prev.deckTranslateOrder,
        };
        
      });
  
    };

    
    // Para trás
    if (movement === 'backward') {

      setCardProjectPosition(prev => {

        const previousProject = prev.currentProject;
        const outOfBounds = previousProject - 1 < 0;
        const changeDeck = prev.currentDeck - 1 < 0 ? 2 : prev.currentDeck - 1;

        return {
          currentProject: outOfBounds ? 4 : previousProject - 1,
          cardTranslateValue: prev.cardTranslateValue + 100,
          currentDeck: outOfBounds ? changeDeck : prev.currentDeck,
          deckTranslateValue: outOfBounds
            ? prev.deckTranslateValue.map((value, index) => {

              const deckToMove = prev.deckTranslateOrder[movement].at(changeDeck);
   
              if (deckToMove === index) return value - 300;
              if (deckToMove !== index) return value;
              
            })
            : prev.deckTranslateValue
          ,
          deckTranslateOrder: prev.deckTranslateOrder,
        };

      });

    };


    // Clicar em dots navegação ou no próprio card
    if (typeof movement === 'number') {
      
      setCardProjectPosition(prev => {

        const [
          positionAddon,
          nextDeck,
          direction,
          translateValue
        ] = determineDirection(clickedDeck, prev.currentDeck);
        
        // My code works, and I have no idea why
        const translateAmount = 
          invertNumberSign((((movement + positionAddon) - 1) - ((prev.currentProject + 5) - 1)) * 100)
        ;

        const newDeckTranslateValues = prev.deckTranslateValue.map((value, index) => {

          if (direction === 'center') return value;

          const deckToMove = prev.deckTranslateOrder[direction].at(nextDeck);

          if (deckToMove === index) return value - (translateValue);
          if (deckToMove !== index) return value;
       });


        return {
          currentProject: movement,
          cardTranslateValue: prev.cardTranslateValue + (translateAmount),
          currentDeck: nextDeck,
          deckTranslateValue: newDeckTranslateValues,
          deckTranslateOrder: prev.deckTranslateOrder,
        };
          
      });

    };

    // Tocar na tela (soon)
    if (movement === 'touch') {
      // console.log('tocando na tela');
      // Lógica para manipular isso com telas touchscreen - SOON!
    };

  };


  return (
    <section className='section-projects'>
      <h3 className='tertiary-title'>Projects</h3>
      <h2 className='secondary-title'>Front end</h2>

      <div
        className='main-container--projects'
        onTouchStart={event => handleProjectsMovement('touch', event)}
      >

        {cardProjectPosition.deckTranslateValue.map((deckTranslateValue, deckIndex) => {
          return (
            <div 
              className='sub-container--projects'
              style={{ transform: `translateX(${deckTranslateValue}%)` }}
              key={deckIndex}
            >

            {projectsInfo.map((projectInfo, index) => {
              return (<CardProject
                key={projectInfo.key}
                title={projectInfo.title}
                description={projectInfo.description}
                imgSample={projectInfo.imgSample}
                index={index}
                handleProjectsMovement={handleProjectsMovement}
                position={
                  cardProjectPosition.currentDeck === deckIndex
                    ? cardProjectPosition.currentProject
                    : projectsQty + 1
                }
                translateValue={cardProjectPosition.cardTranslateValue}
                deckIndex={deckIndex}
                // position={projectInfo.key} // Usar esse prop, ao inves de index, caso queiramos que dot comece no primeiro ponto.
            />)})}

          </div>)

        })}
      </div>

      <div className='navigation-container'>
        <img
          src={arrowBack}
          alt="navigation arrow icon"
          className='navigation-arrow'
          onClick={() => handleProjectsMovement('backward')}
        />

        <div className='dots-navigation'>
          {projectsInfo.map((projectInfo, index) => {
            return (
              <DotsNavigation
                index={index}
                cardProjectOrder={cardProjectPosition.currentProject}
                handleProjectsMovement={() => handleProjectsMovement(index, cardProjectPosition.currentDeck)}
                key={projectInfo.key}
              />
            )
          })}
        </div>

        <img
          src={arrowForward}
          alt="navigation arrow icon"
          className='navigation-arrow'
          onClick={() => handleProjectsMovement('forward')}
        />
      </div>
    </section>
  );
};

export default Projects;

/*

// Antigo - tentar entender o que acontecia de errado em translate amount e tbm determineDirection

import "./Projects.css";
import { useState } from "react";

// ICONS
import arrowBack from "../../icons/caret-back-outline.svg";
import arrowForward from "../../icons/caret-forward-outline.svg";
import fillerLogo from "../../icons/logo-firebase.svg"

import CardProject from "./CardProject/CardProject";
import DotsNavigation from "./DotsNavigation/DotsNavigation";

const projectsInfo = [

  {
    title: 'Project*Sample #1',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 3,
  },

  {
    title: 'Project*Sample #2',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 4,
  },
  
  {
    title: 'Project*Sample #3',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 0,
  },

  {
    title: 'Project*Sample #4',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 1,
  },

  {
    title: 'Project*Sample #5',
    description: 
      `Lorem text random*
      useless tanto faz*
      quick brownfox.`,
    imgSample: fillerLogo, 
    key: 2,
  },

];

// FALTA:
// Arranjar solução para não se ver efeito de translate nos cards sem que seja necessário aplicar overflow: hidden em .section-projects

// Verificarmos pq tem um espaço mínimo entre os decks (ativar border em App.css)
// Resolvido desativando align-items: center na classe .main-container--projects
// Edit: não resolveu nada

// Corrigir: deslocamento ao se movimentar clicando no card/pontos está impedindo que continuemos navegação pq provavalmente está esbarrando no width de 120 rem da página

// Adicionar barra de scroll personalizada e que desaparece

// Adicionar scroll ao usarmos touch (se lascou heheheheheh)

// Ao clicarmos em info expadir texto ou outro efeito qualquer para que botão não seja inútil

// Na hora de criar curriculo interativo adicionar mesma cor de fundo do pdf aberto

// Ajuda para problema de clique nos cards, ir em projects.css e ativar cor de fundo na linha 27


const Projects = function() {
  
  const projectsQty = projectsInfo.length;
  const [cardProjectPosition, setCardProjectPosition] = useState({

    // Caso queiramos que dot comece no primeiro ponto mudar pra 0
    currentProject: 2,
    cardTranslateValue: 0,
    currentDeck: 1,
    deckTranslateValue: [0, 0, 0],
    
    // Posição obtida a partir deckTranslateOrder.at(changeDeck) sempre teremos qual a deck temos de incrementar translateValue +/-300 em deckTranslateValue conforme direção.
    // desse jeito moveremos sempre o último deck conforme direção clicada
    // Exemplo: prev.deckTranslateOrder[movement].at(changeDeck) === deck da ponta oposta a ser movido

    // Futuramente pode ser muito importante entender lógica destas duas arrays: basicamente, toda vez que avançavamos currentDeck, precisavámos movimentar deck do outro extremo ao atual, então a solução que encontrei, foi colocar em uma array na posição equivalente ao valor do DeckAtual a posição do deck que precisavámos mover, pela propria lógica de alternância dos valores de decks 0 > 1 > 2 e então repetindo novamente: 0 > 1 > 2 etc, então com esta alternância, buscando com o valor de deck atual a posição na array deckTranslateOrder obteríamos o deck a ser movido, tanto para trás, como para frente

    // Recorte três papéis, coloque-os na posição 0, 1 ,2. Ao chegar no papel 2, como se estivesssemos avançando na seta, repare que precisariamos mover deck 0, então na posição 2 (valor de currentDeck), está o 0 que é o deck a ser movido, e assim sucessivamente, (proximo é deck 0, então nesta posição vai o valor de 1, que [e o próximo a ser movido), espero ter ajudado você no futuro  

    deckTranslateOrder: {
      forward: [1, 2, 0],
      backward: [2, 0, 1],
    },

  });

  const invertNumberSign = function(num) {
    if (num < 0) return Math.abs(num);
    if (num > 0) return -num;
    if (num === 0) return num;
  };


  const determineDirection = function(clickedDeck, currDeck) {

    // Clicou na esquerda
    if (currDeck + clickedDeck === 2 && currDeck === 0) return [0, clickedDeck, 'backward', 300]; 
    if (currDeck + clickedDeck === 3 && currDeck === 2) return [0, clickedDeck, 'backward', 300];
    if (currDeck + clickedDeck === 1 && currDeck === 1) return [0, clickedDeck, 'backward', 300];

    // Clicou no mesmo deck/centro;
    if (currDeck === clickedDeck) return [4, currDeck, 'center', 0];

    // Clicou na direita
    if ( currDeck + clickedDeck === 1 && currDeck === 0) return [9, clickedDeck, 'forward', -300];
    if (currDeck + clickedDeck === 2 && currDeck === 2) return [9, clickedDeck, 'forward', -300];
    if (currDeck + clickedDeck === 3 && currDeck === 1) return [9, clickedDeck, 'forward', -300];

  };


  const handleProjectsMovement = function(movement, clickedDeck) {

    // Para frente
    if (movement === 'forward') {
      
      setCardProjectPosition(prev => {

        const previousProject = prev.currentProject;
        const outOfBounds = previousProject + 1 === projectsQty;
        const changeDeck = prev.currentDeck + 1 === 3 ? 0 : prev.currentDeck + 1; 

        return {
          currentProject: outOfBounds ? 0 : previousProject + 1,
          cardTranslateValue: prev.cardTranslateValue - 100,
          currentDeck: outOfBounds ? changeDeck : prev.currentDeck,
          deckTranslateValue: outOfBounds
            ? prev.deckTranslateValue.map((value, index) => {
              if (prev.deckTranslateOrder[movement].at(changeDeck) === index) return value + 300;
              if (prev.deckTranslateOrder[movement].at(changeDeck) !== index) return value;
            })
            : prev.deckTranslateValue
          ,
          deckTranslateOrder: prev.deckTranslateOrder,
        };
        
      });
  
    };

    
    // Para trás
    if (movement === 'backward') {

      setCardProjectPosition(prev => {

        const previousProject = prev.currentProject;
        const outOfBounds = previousProject - 1 < 0;
        const changeDeck = prev.currentDeck - 1 < 0 ? 2 : prev.currentDeck - 1;

        return {
          currentProject: outOfBounds ? 4 : previousProject - 1,
          cardTranslateValue: prev.cardTranslateValue + 100,
          currentDeck: outOfBounds ? changeDeck : prev.currentDeck,
          deckTranslateValue: outOfBounds
            ? prev.deckTranslateValue.map((value, index) => {

              // Dar nome em uma variável a  tudo que está em aqui antes de ===
              if (prev.deckTranslateOrder[movement].at(changeDeck) === index) return value - 300;
              if (prev.deckTranslateOrder[movement].at(changeDeck) !== index) return value;
              
            })
            : prev.deckTranslateValue
          ,
          deckTranslateOrder: prev.deckTranslateOrder,
        };

      });

    };


    // Clicar dots de navegação ou no próprio card
    if (typeof movement === 'number') {
      
      setCardProjectPosition(prev => {

        const [
          positionAddon,
          nextDeck,
          direction,
          translateValue
        ] = determineDirection(clickedDeck, prev.currentDeck);
        
        // Falta só descobrir pq ao clicar para trás estamos voltando sempre um card a menos do que o esperado
        const translateAmount = 
          invertNumberSign(((movement + positionAddon) - (prev.currentProject + 4)) * 100)
        ;

        const newdeckTranslateValues = prev.deckTranslateValue.map((value, index) => {
          if (direction === 'center') return value;
          if (prev.deckTranslateOrder[direction].at(nextDeck) === index) return value - (translateValue);
          if (prev.deckTranslateOrder[direction].at(nextDeck) !== index) return value;
       });


        return {
          currentProject: movement,
          cardTranslateValue: prev.cardTranslateValue + (translateAmount),
          currentDeck: nextDeck,
          deckTranslateValue: newdeckTranslateValues,
          deckTranslateOrder: prev.deckTranslateOrder,
        };
          
      });

    };

    if (movement === 'touch') {
      console.log('tocando na tela');
      // Lógica para manipular isso com touch - EM BREVE
    };

  };


  return (
    <section className='section-projects'>
      <h3 className='tertiary-title'>Projects</h3>
      <h2 className='secondary-title'>Front end</h2>

      <div className='main-container--projects' onTouchStart={event => handleProjectsMovement('touch', event)}>

        {cardProjectPosition.deckTranslateValue.map((deckTranslateValue, deckIndex) => {
          return (<div 
            className='sub-container--projects'
            style={{transform: `translateX(${deckTranslateValue}%)`}}
            key={deckIndex}
          >
            {projectsInfo.map((projectInfo, index) => {
              return (<CardProject
                key={projectInfo.key}
                title={projectInfo.title}
                description={projectInfo.description}
                imgSample={projectInfo.imgSample}
                index={index}
                handleProjectsMovement={handleProjectsMovement}
                position={
                  cardProjectPosition.currentDeck === deckIndex
                    ? cardProjectPosition.currentProject
                    : projectsQty + 1
                }
                translateValue={cardProjectPosition.cardTranslateValue}
                deckIndex={deckIndex}
                // position={projectInfo.key} // Usar esse prop, ao inves de index, caso queiramos que dot comece no primeiro ponto.
            />)})}
          </div>)
        })}
      </div>

      <div className='navigation-container'>
        <img
          src={arrowBack}
          alt="navigation arrow icon"
          className='navigation-arrow'
          onClick={() => handleProjectsMovement('backward')}
        />

        <div className='dots-navigation'>
          {projectsInfo.map((projectInfo, index) => {
            return (
              <DotsNavigation
                index={index}
                cardProjectOrder={cardProjectPosition.currentProject}
                handleProjectsMovement={() => handleProjectsMovement(index, cardProjectPosition.currentDeck)}
                key={projectInfo.key}
              />
            )
          })}
        </div>

        <img
          src={arrowForward}
          alt="navigation arrow icon"
          className='navigation-arrow'
          onClick={() => handleProjectsMovement('forward')}
        />
      </div>
    </section>
  );
};

export default Projects;


*/