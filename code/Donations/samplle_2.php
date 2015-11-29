<?php

require_once dirname( __FILE__ ) . '/payu.php';

function payment_success() {
	/* Payment success logic goes here. */
	echo "Congratulations !! The Payment is successful.";
}

function payment_failure() {
	/* Payment failure logic goes here. */
	echo "We are sorry. The Payment has failed";
}



/* Payments made easy. */

if ( count( $_POST ) ) 
	pay_page( array ('key' => 'gtKFFx', 'txnid' => uniqid( 'animesh_' ), 'amount' => rand( 0, 100 ),
			'firstname' => 'Test', 'email' => 'test@payu.in', 'phone' => '98765433210',
			'productinfo' => 'Product Info', 'surl' => 'payment_success', 'furl' => 'payment_failure'), 
			'eCwWELxi' );



/* Merchant Page. ( All the html code ) */

else {
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Payu Payments</title>
	</head>
	
	<body>
		<h2> Payu Payments Example </h2> <hr />
		<form method='POST'>
			<table border='0'>
				<tr> <td> Key : </td> <td> <input name='key' type='text' value='tradus'> </td>
				<tr> <td> Transaction Id : </td> <td> <input name='txnid' type='text' value='<?php echo uniqid( "animesh_" );?>'> </td>			
				<tr> <td> Amount : </td> <td> <input name='amount' type='text' value='<?php echo rand(0, 100);?>'> </td>
				<tr> <td> Firstname : </td> <td> <input name='firstname' type='text' value='animesh'> </td>
				<tr> <td> Email : </td> <td> <input name='email' type='text' value='animesh.kundu@payu.in'> </td>
				<tr> <td> Phone : </td> <td> <input name='phone' type='text' value='1234567890'> </td>
				<tr> <td> Product Info : </td> <td> <input name='productinfo' type='text' value='Just another test site'> </td>
			</table>
			
			<input type="submit" value="Submit">
		</form>
	</body>
</html>

<?php }

/* And we are done. */
