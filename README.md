🪑 Resume Furniture – Cloud Native Full Stack Application
🚀 Project Overview

Resume Furniture is a cloud-native full-stack furniture e-commerce application built using modern DevOps and Kubernetes practices.

The application is containerized with Docker and deployed on AWS-backed Kubernetes (EKS), ensuring scalability, reliability, and high availability.
---
🏗️ Architecture Diagram

📌 Add your architecture image here

## 🏗️ Architecture

![Architecture](images/architecture.png)

🏠 Home Page
![Home Page](images/home.png)

🛒 Product Page
![Products](images/products.png)

🔐 Login Page
![Login](images/login.png)

📦 Kubernetes Deployment
![K8s Deployment](images/k8s.png)


⚙️ How to Run This Project (Step-by-Step Guide)
📌 Prerequisites
Step 1: IAM Configuration
Create a user eks-admin with AdministratorAccess.
Generate Security Credentials: Access Key and Secret Access Key.
Step 2: EC2 Setup
Launch an Ubuntu instance t2.micro in your favourite region (eg. region ap-south-1).
SSH into the instance from your local machine.
Step 3: Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
aws configure

Step 4: Install Docker
sudo apt-get update
sudo apt install docker.io
sudo usermod -aG docker #USER
docker ps

push images to dokcerhub then run manifest files (using vs code) 
 - frontend image      (docker build -t shivsaini23/frontend:latest .  ,docker push...) 
 - backend image       (docker build -t shivsaini23/backend:latest .   ,docker push...)

Step 5: Install kubectl
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client

Step 6: Install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version


Create EKS Cluster on AWS (Master machine)
IAM user with access keys and secret access keys
AWSCLI should be configured (Setup AWSCLI)

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install
aws configure

Install kubectl (Master machine)(Setup kubectl )
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client

Install eksctl (Master machine) (Setup eksctl)
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version

Create EKS Cluster (Master machine)
eksctl create cluster --name=furniturecluster \
                    --region=ap-south-1 \
                    --version=1.30 \
                    --without-nodegroup

Associate IAM OIDC Provider (Master machine)
eksctl utils associate-iam-oidc-provider \
  --region ap-south-1 \
  --cluster furniturecluster \
  --approve

Create Nodegroup (Master machine)
eksctl create nodegroup --cluster=furniturecluster \
                     --region=ap-south-1 \
                     --name=furniturecluster \
                     --node-type=t2.medium \
                     --nodes=2 \
                     --nodes-min=2 \
                     --nodes-max=2 \
                     --node-volume-size=29 \
                     --ssh-access \
                     --ssh-public-key=eks-nodegroup-key 

check nodes 
 kubectl get nodes  (2 server are running as a node servers)

Create namespace
kubectl create namespace three-tier


🔹 Step 1: Clone the Repository
git clone https://github.com/shiv852/Resume-furniture/tree/maindevops
cd Resume-furniture

🔹 Step 3: Apply Kubernetes Manifests
kubectl apply -f k8s/

If files are separate:
kubectl apply -f backend-deployment.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f ingress.yaml


Step 4: Verify Deployment
-kubectl get pods -n three-tier (three pods are running frontend, backend, mongodb)

Check services
-kubectl get svc -n three-tier

check logs pods are running or not 
- kubectl logs <pod-name> -n three-tier


Step 9: Install AWS Load Balancer
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
eksctl utils associate-iam-oidc-provider --region=us-west-2 --cluster=three-tier-cluster --approve
eksctl create iamserviceaccount --cluster=three-tier-cluster --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-arn=arn:aws:iam::626072240565:policy/AWSLoadBalancerControllerIAMPolicy --approve --region=us-west-2
Step 10: Deploy AWS Load Balancer Controller
sudo snap install helm --classic
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks
helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=my-cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
kubectl get deployment -n kube-system aws-load-balancer-controller
kubectl apply -f full_stack_lb.yaml


Cleanup
To delete the EKS cluster:
eksctl delete cluster --name furniturecluster --region ap-south-1



🎯 Key Highlights

Containerized microservice-based architecture

Secure authentication using JWT

Kubernetes-managed deployment

Production-ready infrastructure setup









