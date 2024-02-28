import { config } from './config';
import cluster from 'cluster';
import { logger } from './utils/logger';
import { cpus } from 'os';
//import controllers
import app from './app'
const numCPUs = cpus().length;

if (cluster.isPrimary) {
    // create a worker for each CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        logger.info(`worker online, worker id: ${worker.id}`);
    });
    //if worker dies, create another one
    cluster.on('exit', (worker, code, signal) => {
        logger.error(
            `worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`
        );
        cluster.fork();
    });
} else {

    app.listen(config.port, function () {
        const workerId =
            cluster.worker && cluster.worker.id ? cluster.worker.id : undefined;
        logger.info(
            `worker started: ${workerId} | server listening on port: ${config.port}`
        );
    });
}