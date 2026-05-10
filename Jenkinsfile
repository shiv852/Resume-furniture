@Library('Shared') _
pipeline {
    agent any
    /*
    environment{
        SONAR_HOME = tool "Sonar"
    }
    */
    parameters {
        string(name: 'FRONTEND_DOCKER_TAG', defaultValue: '', description: 'Setting docker image for latest push')
        string(name: 'BACKEND_DOCKER_TAG', defaultValue: '', description: 'Setting docker image for latest push')
    }
    
    stages {
        stage("Validate Parameters") {
            steps {
                script {
                    if (params.FRONTEND_DOCKER_TAG == '' || params.BACKEND_DOCKER_TAG == '') {
                        error("FRONTEND_DOCKER_TAG and BACKEND_DOCKER_TAG must be provided.")
                    }
                }
            }
        }
        stage("Workspace cleanup"){
            steps{
                script{
                    cleanWs()
                }
            }
        }
        
        stage('Git: Code Checkout') {
            steps {
                script{
                    code_checkout("https://github.com/shiv852/Resume-furniture.git","maindevops")
                    
                }
            }
        }
        /*
        stage("Trivy: Filesystem scan"){
            steps{
                script{
                    trivy_scan()
                }
            }
        }

        stage("OWASP: Dependency check"){
            steps{
                script{
                    owasp_dependency()
                }
            }
        }
        
        stage("SonarQube: Code Analysis"){
            steps{
                script{
                    sonarqube_analysis("Sonar","wanderlust","wanderlust")
                }
            }
        }
        
        stage('Exporting environment variables') {
            parallel{
                stage("Backend env setup"){
                    steps {
                        script{
                            dir("Automations"){
                                sh "bash updatebackendnew.sh"
                            }
                        }
                    }
                }
                
                stage("Frontend env setup"){
                    steps {
                        script{
                            dir("Automations"){
                                sh "bash updatefrontendnew.sh"
                            }
                        }
                    }
                }
            }
        }
        
        stage("SonarQube: Code Quality Gates"){
            steps{
                script{
                    sonarqube_code_quality()
                }
            }
        }
        */
        stage("Docker: Build Images"){
            steps{
                script{
                        dir('backend'){
                            docker_build("furniture-backend-beta","${params.BACKEND_DOCKER_TAG}","shivsaini23")
                        }
                    
                        dir('frontend'){
                            docker_build("furniture-frontend-beta","${params.FRONTEND_DOCKER_TAG}","shivsaini23")
                        }
                }
            }
        }
        
        stage("Docker: Push to docker"){
            steps{
                script{
                    docker_push("furniture-backend-beta","${params.BACKEND_DOCKER_TAG}","shivsaini23") 
                    docker_push("furniture-frontend-beta","${params.FRONTEND_DOCKER_TAG}","shivsaini23")
                }
            }
        }
    }
    post{
        success{
            // archiveArtifacts artifacts: '*.xml', followSymlinks: false
            echo 'Pipeline completed successfully'

            build job: "webpipeline-cd", parameters: [  //update the pipeline name CD wali here
                string(name: 'FRONTEND_DOCKER_TAG', value: "${params.FRONTEND_DOCKER_TAG}"),
                string(name: 'BACKEND_DOCKER_TAG', value: "${params.BACKEND_DOCKER_TAG}")
            ]
        }
    }
}
