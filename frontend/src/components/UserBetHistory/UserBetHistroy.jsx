import { Fragment, Component } from "react";
import withRouter from "../withRouter";
import BetHistortyBox from "./BetHistortyBox"
import { InView } from 'react-intersection-observer'
import { Loading, TypographyLight } from "../customUIComponents"; 
import { SnackbarContext } from "../Snackbar/SnackbarContext";

/**
 * Contains all the bet history of a specific user.
 */
class UserBetHistory extends Component {
    static contextType = SnackbarContext;

    constructor(props) {
        super(props);
        this.state = {
            bets: [],
            page: 1,
            isBetLoading: true,
        }
    }
    /**
     * Fetches the first 5 recent bets of user.
     */
    async componentDidMount() {
        await this.fetchBets(this.state.page);
    }
    /**
     * Updates bets to next page, along with best
     * content on the state.
     */
    async updatePageAndBets() {
        await this.fetchBets(this.state.page + 1);
        this.setState({page: this.state.page + 1});
    }
    /**
     * Fetches bets of the user based on the page number
     * and amount to fetch. Then, update the state
     * @param {Number} page page number 
     */
    async fetchBets(page) {
        const url = "/api/user/history/";
        const limit = 5;
        try {
            const response = await fetch(url + this.props.params.id 
                + `?page=${page}&limit=${limit}`);
            if (response.ok) {
                this.setState({
                    isBetLoading: false,
                    bets: this.state.bets.concat(await response.json())
                });
            }
        } catch (e) {
            this.context.setSnackbar(true, "Something went wrong. Please try again later", "error")
        }
    }
    render() {
        return(
            <Fragment>
                {this.state.isBetLoading
                    ? <Loading />
                    : this.state.bets.length > 0
                        ? this.state.bets.map(bet =>
                            bet.match ? <BetHistortyBox bet={bet} key={bet.bet_participant_id}/> : null)
                        : <TypographyLight variant="h4" marginTop={1} marginBottom={1}
                            style={{opacity: "50%"}}>
                    No Bets Found
                        </TypographyLight>
                }    
                <InView 
                    as={'div'}
                    initialInView={true}
                    onChange={(inView, entry) => {
                        if (inView && !this.state.isBetLoading) {
                            this.updatePageAndBets();
                        }
                    }}
                >
                </InView>     
            </Fragment>
        );
    }
}
export default withRouter(UserBetHistory);