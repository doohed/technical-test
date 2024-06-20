import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact/create");
  };
  return (
    <div className="fixed left-[10vw] bottom-[3vh] text-left mt-5">
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AddContact;
