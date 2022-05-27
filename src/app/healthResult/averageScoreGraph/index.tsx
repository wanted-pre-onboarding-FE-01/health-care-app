import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryLabel,
} from 'victory';
import data from '../../../data/response.json';
import styles from './averageScoreGraph.module.scss';
import cn from 'classnames';
import { COLORS } from '../_shared/colors';
import { CallbackArgs } from 'victory-core';

console.log(data);

const AverageScoreGraph = () => {
  const { userInfo, wxcResultMap } = data;

  const GRAPTH_DATA = [
    { user: '나', score: userInfo.healthScore },
    { user: '30대 남성', score: wxcResultMap.hscore_peer },
  ];

  const isHigherMyScore = userInfo.healthScore > wxcResultMap.hscore_peer;
  const scoreDifference = userInfo.healthScore - wxcResultMap.hscore_peer;
  const isHighRank = wxcResultMap.hscorePercent > 50;

  return (
    <div className={styles.averageWrapper}>
      <div className={styles.descriptionWrapper}>
        <div className={styles.scoreTextWrapper}>
          <p>30대 남성 평균 점수보다</p>
          <p className={cn(styles.score, { [styles.highScoreColor]: isHigherMyScore })}>
            {isHigherMyScore ? scoreDifference : -scoreDifference}점 {isHigherMyScore ? '높아요.' : '낮아요.'}
          </p>
        </div>
        <p className={styles.rankText}>
          {isHighRank ? '상위' : '하위'} {100 - wxcResultMap.hscorePercent}%
        </p>
      </div>
      <VictoryChart domainPadding={60}>
        <VictoryAxis
          style={{
            axis: { stroke: 'rgba(255, 99, 71, 0)' },
            tickLabels: { fontSize: 16, fontWeight: 700, fill: COLORS.$GREY_03 },
          }}
        />

        <VictoryBar
          height={500}
          barWidth={35}
          style={{
            data: { fill: ({ datum }) => (datum.user === '나' ? COLORS.$YELLOW : COLORS.$ORANGE) },
            labels: {
              fill: ({ datum }: CallbackArgs) => (datum.user === '나' ? COLORS.$ORANGE : COLORS.$GREY_03),
              fontSize: 16,
              fontWeight: 700,
            },
          }}
          data={GRAPTH_DATA}
          x='user'
          y='score'
          labels={({ datum }) => `${datum.score}점`}
        />
        <VictoryLine
          data={GRAPTH_DATA}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 },
          }}
          style={{ data: { stroke: COLORS.$GREY_02 } }}
          x='user'
          y='score'
        />
        <VictoryScatter
          size={4}
          style={{
            data: {
              fill: ({ datum }) => (datum.user === '나' ? COLORS.$GREY_02 : '#ffffff'),
              stroke: COLORS.$GREY_02,
              strokeWidth: 2,
            },
          }}
          data={GRAPTH_DATA}
          x='user'
          y='score'
        />
      </VictoryChart>
    </div>
  );
};

export default AverageScoreGraph;
