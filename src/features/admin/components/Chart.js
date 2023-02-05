import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { CartesianGrid, Line, XAxis, YAxis, Label, ResponsiveContainer,BarChart,Bar,Tooltip } from 'recharts';





// Generate Poll Data
function createData(index,question, votes) {
  return {index, question, votes };
}


// Main Component
export default function Chart(props) {
  const [data,setData]=React.useState([]);
  const theme = useTheme();
  const createDataSet=()=>{
    let arr=[];
    props.data.map((poll,index)=>{
     let totalVotesPerQuestion= poll.options.reduce((p,c)=>p+c.votes,0);
        return arr.push(createData(`Q${index+1}`, poll.question, totalVotesPerQuestion));
    })
    
    setData(arr);
  }

React.useEffect(()=>{
  createDataSet();
},[])

  return (
    <React.Fragment>
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
            dataKey="index"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
           <Label value="Questions" offset={0} position="insideBottom"/>
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