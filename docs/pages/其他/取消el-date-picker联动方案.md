      <!-- <el-date-picker
            v-model="currentVal"
            v-bind="bindProps"
            v-on="bindEvents"
            type="daterange"
            clearable
            unlink-panels
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker> -->


           <div class="customDate">
            <el-date-picker
            type="date"
            v-bind="bindProps"
            v-on="bindEvents"
            value-format="yyyy-MM-dd"
            placeholder="开始日期"
            :picker-options="pickerOptionsStart"
            v-model="currentVal[0]"
            class="datePickerStart"
          ></el-date-picker>
          <span>—</span>
          <el-date-picker
            type="date"
            v-bind="bindProps"
            v-on="bindEvents"
            value-format="yyyy-MM-dd"
            placeholder="结束日期"
            :picker-options="pickerOptionsEnd"
            v-model="currentVal[1]"
            class="datePickerEnd"
          ></el-date-picker>

           var _this = this


                 pickerOptionsStart: {
        disabledDate(time) {
          let endDateVal = _this.currentVal[0];
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        },
      },
      pickerOptionsEnd: {
        disabledDate(time) {
          let beginDateVal = _this.currentVal[1];
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime();
          }
        },
      },


        ::v-deep .customDate {
    display: flex;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    height: 32px;
    .el-input__inner {
      border: none!important;
      height: 30px;
      line-height: 27px!important;
      text-align: center;
    }
    .datePickerEnd {      
      .el-input__prefix{
        display: none;
      }
    }
  }