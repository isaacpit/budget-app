import React from 'react';

import { connect } from 'react-redux';

import BudgetItem from '../components/./BudgetItem';

const BudgetDetails = (props) => {
  console.log(
    `Budget Details Screen props: ${JSON.stringify(props, null, 2)} `,
  );
  console.log(
    `Budget Details Screen route.params: ${JSON.stringify(
      props.route.params,
      null,
      2,
    )} `,
  );
  return <BudgetItem item={props.route.params.item} />;
};

export default BudgetDetails;
