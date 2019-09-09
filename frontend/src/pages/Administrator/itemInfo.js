import React, {PureComponent} from 'react';

export default class ItemInfo extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.uuid}`;
    const extraInfo = `${info.data}`;
    return (
      <div>
        <div>
        <p>codigo :</p>
        <p>{displayName}</p>
        <p>{extraInfo}</p>
        </div>
      </div>
    );
  }
}