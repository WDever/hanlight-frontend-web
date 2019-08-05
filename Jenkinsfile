node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Install Node Modules') {
        script {
            sh 'yarn'
        }
    }

    stage('Build') {
        script {
            try {
                sh 'yarn build'
            } catch (err) {
                echo 'Failed: $(err)'
            }
        }
    }
}