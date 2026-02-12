# 🪑 Resume Furniture – Cloud Native Full Stack Application

## 🚀 Project Overview

Resume Furniture is a cloud-native full-stack furniture e-commerce application built using modern DevOps and Kubernetes practices.

The application is containerized using Docker and deployed on AWS-backed Kubernetes (EKS), ensuring scalability, reliability, and high availability.

---

## 🛠️ Tech Stack

- Frontend: React.js  
- Backend: Node.js + Express.js  
- Database: MongoDB  
- Containerization: Docker  
- Orchestration: Kubernetes (EKS)  
- Cloud: AWS  

---

## 🏗️ Architecture

![architecture jpeg](https://github.com/user-attachments/assets/b594ace2-18ae-460b-973d-83f3e9fe9e52)

---

## 🖼️ Application Screenshots

### 🏠 Home Page
<img width="1906" height="957" alt="homepage" src="https://github.com/user-attachments/assets/21fff27a-207c-46c1-a078-3799132bdfa1" />

### 🛒 Product Page
![Products](images/products.png)

### 🔐 Login Page
<img width="1896" height="950" alt="login" src="https://github.com/user-attachments/assets/dde70b9c-a523-43f7-beb4-54dd27e749e4" />

### 📦 Kubernetes Deployment

<img width="1372" height="629" alt="kubectl-get-all png" src="https://github.com/user-attachments/assets/696187e0-5085-439b-8261-4e532f21ba48" />


---

# ⚙️ Deployment Guide (AWS EKS Setup)

## 📌 Prerequisites

- AWS Account
- IAM User with AdministratorAccess
- Ubuntu EC2 Instance
- Docker Installed
- AWS CLI Installed
- kubectl Installed
- eksctl Installed

---

## 🔹 Step 1: IAM Configuration

Create IAM user `eks-admin`  
Attach `AdministratorAccess`  
Generate Access Key and Secret Access Key  

---

## 🔹 Step 2: Launch EC2 (Ubuntu)

SSH into your EC2 instance. (t2.micro)

---

## 🔹 Step 3: Install AWS CLI

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
aws configure
```

---

## 🔹 Step 4: Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu
docker ps
```


## 🔹 push images to dokcerhub then run manifest files (using vs code) 
 - frontend image      (docker build -t shivsaini23/frontend:latest .  ,docker push...) 
 - backend image       (docker build -t shivsaini23/backend:latest .   ,docker push...)



---

## 🔹 Step 5: Install kubectl

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.30.0/2024-01-04/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client
```

---

## 🔹 Step 6: Install eksctl

```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

---

# 🚀 Create EKS Cluster

```bash
eksctl create cluster \
  --name furniturecluster \
  --region ap-south-1 \
  --version 1.30 \
  --without-nodegroup
```

---

## 🔹 Associate IAM OIDC Provider

```bash
eksctl utils associate-iam-oidc-provider \
  --region ap-south-1 \
  --cluster furniturecluster \
  --approve
```

---

## 🔹 Create Node Group

```bash
eksctl create nodegroup \
  --cluster furniturecluster \
  --region ap-south-1 \
  --name furniturecluster-ng \
  --node-type t2.medium \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 2
```

Verify nodes:

```bash
kubectl get nodes
```

---

# 📦 Deploy Application

## 🔹 Clone Repository

```bash
git clone https://github.com/shiv852/Resume-furniture.git
cd Resume-furniture
```

---

## 🔹 Create Namespace

```bash
kubectl create namespace three-tier
```

---

## 🔹 Apply Kubernetes Manifests

```bash
kubectl apply -f k8s/ -n three-tier
```

Or individually:

```bash
kubectl apply -f mongo-deployment.yaml -n three-tier
kubectl apply -f backend-deployment.yaml -n three-tier
kubectl apply -f frontend-deployment.yaml -n three-tier
kubectl apply -f ingress.yaml -n three-tier
```

---

## 🔹 Verify Deployment

Check pods:

```bash
kubectl get pods -n three-tier
```

Check services:

```bash
kubectl get svc -n three-tier
```

Check logs:

```bash
kubectl logs <pod-name> -n three-tier
```

---

# 🌐 Install AWS Load Balancer Controller

```bash
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json

aws iam create-policy \
  --policy-name AWSLoadBalancerControllerIAMPolicy \
  --policy-document file://iam_policy.json
```

Install via Helm:

```bash
sudo snap install helm --classic

helm repo add eks https://aws.github.io/eks-charts
helm repo update

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=furniturecluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller
```


 # check ingress 
```bash
kubectl get ing -n three-tier
```

 # check mongodb data in terminal (show user data)
```bash
 kubectl get pods -n three-tier
 kubectl exec -it <pod-name> -n three-tier --/bin/sh
```



# 🧹 Cleanup

```bash
eksctl delete cluster --name furniturecluster --region ap-south-1
```

---

# 🎯 Key Highlights

- Containerized three-tier architecture  
- Secure authentication using JWT  
- Kubernetes-managed deployment  
- AWS Load Balancer integration  
- Scalable and production-ready infrastructure  

---

