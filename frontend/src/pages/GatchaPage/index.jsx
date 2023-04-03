import ResultNft from "./components/ResultNft";
import CharacterList from "./components/CharacterList";
import MetamaskCheck from "../../components/MetamaskCheck";

const GatchaPage = () => {
  return (
      <>
        <MetamaskCheck/>
        <ResultNft />
        <CharacterList/>
      </>
  );
};




export default GatchaPage;
