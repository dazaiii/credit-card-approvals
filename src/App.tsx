import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Button from "@mui/material/Button";
import * as yup from "yup";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import ReactDOM from "react-dom";
import { Ethnicity, Gender, RequestCreditCardApproval } from "./constant";
import { Col, Container, Row } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { MenuComponent } from "./MenuComponent";
import { HistoryTable } from "./HistoryTable";
import { useState } from "react";
import { cardsApi } from "./api/cards";

const validationSchema = yup.object({
  yearsEmployed: yup
    .number()
    .required("Pole wymagane")
    .min(0, "Ilość lat zatrudnienia nie może być mniejsza niż 0")
    .max(50, "Ilość lat pracy nie może być większa niż 50"),
  income: yup.number().required("Pole wymagane"),
  age: yup
    .number()
    .required("Pole wymagane")
    .min(18, "Podany wiek jest zbyt niski")
    .max(100, "Podany wiek jest zbyt duży"),
  gender: yup.string().required("Pole wymagane"),
  bankCustomer: yup.boolean().required("Pole wymagane"),
  ethnicity: yup.string().required("Pole wymagane"),
});

const WithMaterialUI = () => {
  const initialValues: Partial<RequestCreditCardApproval> = {
    yearsEmployed: undefined,
    income: undefined,
    age: undefined,
    gender: undefined,
    bankCustomer: false,
    ethnicity: undefined,
    married: false,
  };

  const [approved, setApproved] = useState<boolean | undefined>(undefined);
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const { approved } = await cardsApi.postCard(
        values as any as RequestCreditCardApproval
      );
      setApproved(approved);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col>
            <TextField
              fullWidth
              type="number"
              id="yearsEmployed"
              label="Staż pracy w latach"
              onChange={formik.handleChange}
              error={
                formik.touched.yearsEmployed &&
                Boolean(formik.errors.yearsEmployed)
              }
              helperText={
                formik.touched.yearsEmployed && formik.errors.yearsEmployed
              }
            ></TextField>
          </Col>
          <Col>
            <TextField
              fullWidth
              type="number"
              id="income"
              label="Przychód"
              onChange={formik.handleChange}
              error={formik.touched.income && Boolean(formik.errors.income)}
              helperText={formik.touched.income && formik.errors.income}
            ></TextField>
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              fullWidth
              type="number"
              id="age"
              label="Wiek"
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            ></TextField>
          </Col>
          <Col>
            <FormControl fullWidth>
              <InputLabel id="gender-simple-select-label">Płeć</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender"
                label="gender"
                name="gender"
                defaultValue=""
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <MenuItem value={Gender.female}>Kobieta</MenuItem>
                <MenuItem value={Gender.male}>Mężczyzna</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormControl className="col-md-6 col-sm-12">
              <InputLabel id="ethinicity-simple-select-label">
                Etniczność
              </InputLabel>
              <Select
                labelId="ethinicity-simple-select-label"
                id="ethnicity"
                label="ethnicity"
                name="ethnicity"
                defaultValue=""
                value={formik.values.ethnicity}
                onChange={(value) => {
                  formik.setFieldValue("ethnicity", value.target.value);
                }}
                error={
                  formik.touched.ethnicity && Boolean(formik.errors.ethnicity)
                }
              >
                <MenuItem key={Ethnicity.latino} value={Ethnicity.latino}>
                  Latynos
                </MenuItem>
                <MenuItem key={Ethnicity.asian} value={Ethnicity.asian}>
                  Azjata
                </MenuItem>
                <MenuItem key={Ethnicity.black} value={Ethnicity.black}>
                  Czarnoskóry
                </MenuItem>
                <MenuItem key={Ethnicity.white} value={Ethnicity.white}>
                  Biały
                </MenuItem>
                <MenuItem key={Ethnicity.other} value={Ethnicity.other}>
                  Inny
                </MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>

        <Row>
          <Col>
            <label>
              <Stack direction="horizontal" gap={2}>
                <input
                  name="bankCustomer"
                  type="checkbox"
                  onChange={formik.handleChange}
                />
                <span>Klient banku</span>
              </Stack>
            </label>
          </Col>
        </Row>

        <Row>
          <Col>
            <label>
              <Stack direction="horizontal" gap={2}>
                <input
                  name="married"
                  type="checkbox"
                  onChange={formik.handleChange}
                />
                <span>W związku małżeńskim</span>
              </Stack>
            </label>
          </Col>
        </Row>

        <Button
          className="col-md-2 col-sm-12"
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Wyślij
        </Button>
      </form>

      <Row>
        <div className="approval">
          {approved !== undefined
            ? approved
              ? "Zaakceptowano przyznanie karty"
              : "Odrzucono przyznanie karty"
            : ""}
        </div>
      </Row>
    </div>
  );
};

function App() {
  const [selected, setSelected] = useState("card");

  const itemSelected = (data: string) => {
    setSelected(data);
  };

  return (
    <div className="App">
      <h1
        style={{
          backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/760/223/715/plastic-money-credit-cards-visa-wallpaper-preview.jpg")`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "10vh",
        }}
      >
        Credit card approvals
      </h1>
      <MenuComponent itemSelected={itemSelected} />
      <Container>
        {selected === "card" && <WithMaterialUI />}
        {selected === "history" && <HistoryTable />}
      </Container>
    </div>
  );
}

ReactDOM.render(<WithMaterialUI />, document.getElementById("root"));
export default App;
