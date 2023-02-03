import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CartesianGrid, LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,BarChart,Bar,Tooltip } from 'recharts';
import Title from './Title';





// Generate Poll Data
function createData(option, votes) {
  return {option, votes };
}


// Main Component
export default function ResultChart(props) {
  const [data,setData]=React.useState([]);
  const theme = useTheme();
  const createDataSet=()=>{
    let arr=[];
    props.data.map((option,index)=>{
        return arr.push(createData(option.option, option.votes));
    })
    
    setData(arr);
  }

React.useEffect(()=>{
  createDataSet();
},[])

  return (
    <React.Fragment>
      {/* <Title>{props.question}</Title> */}
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="option"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
           <Label value="" offset={0} position="insideBottom"/>
           </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Votes (%)
            </Label>
          </YAxis>
          <Tooltip />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="votes"
            stroke={props.color}
            dot={false}
          />
         
          <Bar dataKey="votes" isAnimationActive={false} fill={props.color} dot={false} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}