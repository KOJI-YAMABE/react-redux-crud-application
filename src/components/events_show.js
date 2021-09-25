import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field , reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow  extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getEvent(id)
  }
  renderField(field) {
    const {input, label, type, meta: { touched, error } } = field
    return (
      <TextField
      hintText={label}
      floatingLabelText={label}
      type={type}
      errorText={ touched && error }
      {...input}
      fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.putEvent(values)
    this.props.history.push('/')
  }

  render() {
    // handleSubmitはinputのvalueを引数で取得できる
    // pristineは送信ボタンの活性化/非活性化
    // submittingは複数回連続で押下できるのを回避
    // invalidはvalidate errorがあるときはSubmitできない
    const { handleSubmit,  pristine, submitting, invalid } = this.props
    const style={ margin: 12 }

    return(
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label="タイトル" name="title" type="text" component={this.renderField } />
        </div>
        <div>
          <Field label="内容" name="body" type="text" component={this.renderField } />
        </div>

        <RaisedButton label="送信" type="submit" style={style} disabled={pristine || submitting || invalid } />
        <RaisedButton label="戻る" style={style} containerElement={<Link to="/" />}/>
        <RaisedButton label="削除" style={style} onClick={this.onDeleteClick} />
      </form>
    )
  }
}
const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "タイトルを入力してください"
  if (!values.body) errors.body = "内容を入力してください"

  return errors
}

// 更新するValue値を渡す処理
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return{ initialValues: event, event }
}

const mapDispatchToProps = ({ deleteEvent,  getEvent, putEvent })

// enableReinitializeオプションはデータを受け渡すために必要
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)
