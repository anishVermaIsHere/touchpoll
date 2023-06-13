import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box,Grid,Paper,Typography,CardContent,Card,Divider,Skeleton} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EmptyPage from "../../../../utils/widgets/EmptyPage";
import { getPolls } from "../../../../utils/redux/slices/polls/poll-slice";
import { fetchPolls } from "../../../../utils/services/api/polls-api";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
  border: "1px solid rgb(0,0,0,0.3)",
  color: theme.palette.text.secondary,
}));

const PollSection = () => {
  const allPolls = useSelector((state) => state.pollSlice.allPolls);
  const [polls, setPolls] = React.useState({ data: [], loading: true });
  const dispatch = useDispatch();

  const pollSkeleton = (id) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={id}>
        <Card align="center" sx={{ maxHeight: 120 }}>
          <CardContent sx={{ marginBottom: "20%" }}>
            <Skeleton
              variant="text"
              width="70%"
              height="40"
              sx={{ mt: 1, mb: 3 }}
            />
            <Skeleton variant="text" width="60%" height="30" />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  useEffect(() => {
    dispatch(getPolls());
    const response = fetchPolls();
    response
      .then((res) =>
        setPolls({
          data: res.data.polls.sort((a, b) => {
            return b - a ? 1 : -1;
          }),
          loading: false,
        })
      )
      .catch();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: 1200}}>
      {allPolls.length == 0 ? (
        <EmptyPage message="No Polls, Please create then visit" />
      ) : (
        <>
          <Typography align="center" variant="h5" mb={2}>
            All Polls
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            {polls.data.map((poll, index) =>
              polls.loading ? (
                <>{pollSkeleton("key" + index)}</>
              ) : (
                <Grid item xs={12} sm={6} md={4} key={poll.uid}>
                  <NavLink to={`/user/poll/${poll._id}`}>
                    <Item
                      sx={{
                        margin: "0.5rem 0.4rem",
                        minHeight:'100px',
                        backgroundColor: "#bbdff366",
                        "&:hover": {
                          fontSize: "1rem",
                          boxShadow: "0 5px 5px rgb(70, 110, 135)",
                          transition:'all .5s'
                        },
                      }}
                    >
                      <Typography align="center" variant="p" color="primary">
                        {poll.question}
                      </Typography>
                      <p>Expire on: {poll.expiry_date.substr(0, 10)}</p>
                    </Item>
                  </NavLink>
                </Grid>
              )
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default PollSection;
