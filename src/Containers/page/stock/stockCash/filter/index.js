import { Box, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import Styles from './index.module.scss'
import { dateConverttShamsiToMiladi } from '../../../../Common/method/date';
import DatePicker from './../../../../Common/Components/DatePicker';

const useStyles = makeStyles((theme) => ({
  filter: {
    width: "96.5%",
    height: "auto",
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    padding: 30,
  },
  buttons: {
    textAlign: "right",
  },
}));



const Index = ({ flagFilter, handleChangeFilter, stateFilter, handelSubmitFilter }) => {
  const classes = useStyles()

  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          <Box className={Styles["filter"]}>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"نام"}
                value={stateFilter.member_first_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_first_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"نام خانوادگی"}
                value={stateFilter.member_last_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_last_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"کد ملی"}
                value={stateFilter.member_national_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_national_id")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"نماد"}
                value={stateFilter.stock_symbol}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "stock_symbol")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"شرکت"}
                value={stateFilter.company_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "company_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"تعداد سهام"}
                value={stateFilter.stocks}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "stocks")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"ارزش سود"}
                value={stateFilter.dividend_value}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "dividend_value")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"سود ناخالص نقدی توزیع شده"}
                value={stateFilter.distributed_gross_margin}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "distributed_gross_margin")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"سود خالص نقدی توزیع شده"}
                value={stateFilter.distributed_netincome}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "distributed_netincome")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"ارزش سهام پیش از مجمع"}
                value={stateFilter.pre_price_stock_agm}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "pre_price_stock_agm")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"قیمت سهم پس از مجمع"}
                value={stateFilter.post_price_stock_agm}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "post_price_stock_agm")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"قیمت سهم پیش از مجمع"}
                value={stateFilter.pre_value_stock}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "pre_value_stock")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"ارزش سهام پس از مجمع"}
                value={stateFilter.post_value_stock}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "post_value_stock")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"سرمایه شرکت"}
                value={stateFilter.company_asset}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "company_asset")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"سود خالص تحقق یافته"}
                value={stateFilter.valid_netincome}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "valid_netincome")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <DatePicker label="تاریخ مجمع">
                {(data) =>
                  handleChangeFilter(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                      : null,
                    "agm_date"
                  )
                }
              </DatePicker>
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <DatePicker label="تاریخ اعلام">
                {(data) =>
                  handleChangeFilter(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                      : null,
                    "publish_date"
                  )
                }
              </DatePicker>
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <DatePicker label="تاریخ پرداخت">
                {(data) =>
                  handleChangeFilter(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                      : null,
                    "pay_date"
                  )
                }
              </DatePicker>
            </Box>
          </Box>

          <Box p={2}>
            <div className={classes.buttons}>
              <button
                className="btnBlueFilter"
                onClick={() => handelSubmitFilter()}
              >
                بازخوانی
              </button>
            </div>
          </Box>
        </div>
      ) : null}
    </>
  );
}

export default Index;