# React Miner

Simple miner game written in TypeScript and React

## Part 1:
Chosen data structure [here](https://github.com/DrobenyukA/React-Miner/blob/master/src/types/Game.d.ts)

## Part 2:
Board generation [here](https://github.com/DrobenyukA/React-Miner/blob/master/src/services/Board.service.ts#L70)

## Part 3:
Bombs count [here](https://github.com/DrobenyukA/React-Miner/blob/master/src/services/Board.service.ts#L57)

## Part 4:
Logic of cell update is represented by three different method due to difference in actions depends on cell type:
 - for bomb [here](https://github.com/DrobenyukA/React-Miner/blob/master/src/components/Game/Game.tsx#L21) because game should be over
 - for cell with bombs count that is one or greater [here](https://github.com/DrobenyukA/React-Miner/blob/master/src/services/Board.service.ts#L78)
 - for cell without bombs in adjacent fields [here](https://github.com/DrobenyukA/React-Miner/blob/master/src/services/Board.service.ts#L95)

 P.S. The working example can be observed by clicking this [link](https://react-miner.web.app/), also I want to emphasize that UI is not implemented it is only a visualization for testing.