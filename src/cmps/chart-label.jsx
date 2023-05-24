import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = toyService.getLabelsData()

export function ChartLabel() {

  const toys = useSelector((storeState) => storeState.toyModule.toys)
    // data.datasets.data = getLabelsCount()


  function getLabelsCount(){     
      const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
      const labelCounts = labels.map(label => {
        const count = toys.filter(toy => toy.labels.includes(label)).length;
        return count;
      }, {});
      
      console.log(labelCounts);
      return labelCounts
  }

    return (

        <section className='chart'>
            <Doughnut data={data} />;
        </section>
    )
}
