pipeline {
    agent any

    environment {
     // AWS_CREDENTIALS = credentials('AWS_CREDENTIALS')
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')  
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_REGION = 'us-east-1'  // AWS region
        S3_BUCKET = '05dec-quizapp'  // S3 bucket name
        CLOUDFRONT_DISTRIBUTION_ID = 'E30EVQWLNQK4AF'  // CloudFront distribution ID
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/Nirajkumar18/quiz-app.git'
            }
        }

        stage('Install Dependencies and Build') {
            steps {
                script {
                    nodejs('NodeJS 18') {
                        sh '''
                            npm install
                            npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                sh 'aws s3 sync ./build s3://$S3_BUCKET --delete'
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                sh 'aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"'
            }
        }
    }

    post {
        success {
            echo 'Build and Deployment successful!'
        }
        failure {
            echo 'Build or Deployment failed'
        }
    }
}
