from db_connection import get_database_connection
from db_operations import fetch_frozen_sweeps, update_sweep_status


def unfreezeSweeps():
    # Establish a connection to the database
    db_conn = get_database_connection()

    # Retrieve all sweeps that are marked as frozen
    frozen_sweeps = fetch_frozen_sweeps(db_conn)

    # Iterate over the collection of frozen sweeps and reset their status
    for sweep in frozen_sweeps:
        # Reset the sweep's status to the normal state
        sweep['is_frozen'] = False

        # Update the sweep's status in the data store
        update_sweep_status(db_conn, sweep['id'], sweep['is_frozen'])

    # Close the database connection
    db_conn.close()
