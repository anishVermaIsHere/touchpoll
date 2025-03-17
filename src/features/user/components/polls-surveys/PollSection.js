import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CardContent,
  Card,
  Divider,
  Skeleton,
  Stack,
  Chip,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EmptyPage from "../../../../utils/widgets/EmptyPage";
import { getPolls } from "../../../../lib/redux/slices/polls/poll-slice";
import dayjs from "dayjs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  boxShadow: "none",
  border: "1px solid rgb(0,0,0,0.3)",
  color: theme.palette.text.secondary,
}));

const HEIGHT = 200;

const PollSkeleton = () => {
  return (
    <Grid
      container
      spacing={2}
      mt={10}
      sx={{ flexGrow: 1, margin: "auto", maxWidth: 1200 }}
    >
      {[...new Array(12)].map((_, ind) => {
        return (
          <Grid key={ind} item xs={12} sm={6} md={4} lg={3}>
            <Card align="left" sx={{ height: HEIGHT }}>
              <CardContent sx={{ marginBottom: "20%" }}>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Skeleton variant="text" width="20%" />
                  <Skeleton variant="text" width="20%" />
                </Box>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="100%" sx={{ my: 2 }} />
                <Skeleton variant="text" width="100%" sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" sx={{ mb: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

const PollSection = () => {
  const { loading, allPolls } = useSelector((state) => state.pollSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolls());
    return () => {};
  }, []);

  if (loading) {
    return <PollSkeleton />;
  }

  return (
    <Box sx={{ flexGrow: 1, px: 2, margin: "auto", maxWidth: "lg" }}>
      {allPolls.length ? (
        <>
          <Typography color="primary" align="center" variant="h5" mb={2}>
            All Polls
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            {allPolls?.map((poll, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={poll.uid}>
                <NavLink to={`/user/poll/${poll._id}`}>
                  <Item
                    sx={{
                      height: HEIGHT,
                      textAlign: "left",
                      backgroundColor: "#ebeff266",
                      border: "1px solid #d8d5d5",
                      "&:hover": {
                        // fontSize: "1rem",
                        boxShadow: "0 5px 5px rgb(162 198 237)",
                        transition: "all .5s",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={`Total votes ${poll.voted.length}`}
                        size="small"
                        variant="contained"
                        color="primary"
                      />
                      <Chip
                        label={`Expires ${dayjs(poll.expiry_date).format(
                          "MMM D, YYYY"
                        )}`}
                        size="small"
                        variant="outlined"
                        color="error"
                      />
                    </Stack>
                    <Typography
                      // align="center"
                      component="p"
                      variant="p"
                      sx={{
                        marginTop: "1rem",
                        fontWeight: 600,
                        maxHeight: "80px",
                        overflow: "hidden",
                      }}
                      color="primary"
                    >
                      {poll.question}
                    </Typography>
                    <Typography mt={2}>
                      <Stack direction="column" spacing={1}>
                        {poll.options.slice(0, 3).map(({ option, _id }) => (
                          <Chip
                            key={_id}
                            label={option}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Typography>
                  </Item>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <EmptyPage message="No Polls, Please create then visit" />
      )}
    </Box>
  );
};

export default PollSection;
