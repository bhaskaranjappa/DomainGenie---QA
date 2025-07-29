
import os
import yaml
from typing import Dict, Any, Optional
from dataclasses import dataclass, field
from pathlib import Path

@dataclass
class ModelConfig:
    """Model configuration settings"""
    name: str = "llama-2-7b"
    model_path: str = "meta-llama/Llama-2-7b-hf"
    max_length: int = 4096
    temperature: float = 0.7
    top_p: float = 0.9
    top_k: int = 50

@dataclass
class PEFTConfig:
    """PEFT (Parameter Efficient Fine-Tuning) configuration"""
    method: str = "lora"  # lora, qlora, adalora
    r: int = 16
    lora_alpha: int = 32
    lora_dropout: float = 0.1
    target_modules: list = field(default_factory=lambda: ["q_proj", "v_proj"])
    bias: str = "none"
    task_type: str = "CAUSAL_LM"

    # QLoRA specific
    use_quantization: bool = False
    quantization_bits: int = 4
    quantization_type: str = "nf4"
    compute_dtype: str = "float16"

@dataclass
class TrainingConfig:
    """Training configuration settings"""
    output_dir: str = "./results"
    num_train_epochs: int = 3
    per_device_train_batch_size: int = 4
    per_device_eval_batch_size: int = 4
    gradient_accumulation_steps: int = 4
    learning_rate: float = 2e-4
    weight_decay: float = 0.001
    warmup_ratio: float = 0.03
    lr_scheduler_type: str = "cosine"
    save_steps: int = 500
    eval_steps: int = 500
    logging_steps: int = 100
    max_grad_norm: float = 1.0
    fp16: bool = True
    dataloader_num_workers: int = 4
    remove_unused_columns: bool = False
    report_to: str = "mlflow"

@dataclass
class DataConfig:
    """Data processing configuration"""
    dataset_name: str = "custom"
    train_file: Optional[str] = None
    validation_file: Optional[str] = None
    test_file: Optional[str] = None
    max_train_samples: Optional[int] = None
    max_eval_samples: Optional[int] = None
    streaming: bool = False
    block_size: int = 1024

@dataclass
class SecurityConfig:
    """Security and privacy configuration"""
    enable_pii_detection: bool = True
    enable_bias_detection: bool = True
    anonymization_level: str = "full"  # none, partial, full
    encryption_key: Optional[str] = None
    audit_logging: bool = True
    compliance_mode: str = "gdpr"  # gdpr, ccpa, hipaa

@dataclass
class MLOpsConfig:
    """MLOps configuration"""
    experiment_name: str = "llm-finetuning"
    mlflow_tracking_uri: str = "http://localhost:5000"
    model_registry_uri: str = "sqlite:///mlflow.db"
    enable_auto_logging: bool = True
    log_model: bool = True
    log_artifacts: bool = True

@dataclass
class InfrastructureConfig:
    """Infrastructure configuration"""
    num_gpus: int = 1
    gpu_memory_fraction: float = 0.8
    distributed_training: bool = False
    mixed_precision: bool = True
    gradient_checkpointing: bool = True
    deepspeed_config: Optional[str] = None

class ConfigManager:
    """Central configuration management"""

    def __init__(self, config_path: Optional[str] = None):
        self.config_path = config_path or "configs/default.yaml"
        self.model = ModelConfig()
        self.peft = PEFTConfig()
        self.training = TrainingConfig()
        self.data = DataConfig()
        self.security = SecurityConfig()
        self.mlops = MLOpsConfig()
        self.infrastructure = InfrastructureConfig()

        if os.path.exists(self.config_path):
            self.load_config()

    def load_config(self):
        """Load configuration from YAML file"""
        with open(self.config_path, 'r') as f:
            config = yaml.safe_load(f)

        for section, values in config.items():
            if hasattr(self, section):
                config_obj = getattr(self, section)
                for key, value in values.items():
                    if hasattr(config_obj, key):
                        setattr(config_obj, key, value)

    def save_config(self):
        """Save current configuration to YAML file"""
        config = {
            "model": self.model.__dict__,
            "peft": self.peft.__dict__,
            "training": self.training.__dict__,
            "data": self.data.__dict__,
            "security": self.security.__dict__,
            "mlops": self.mlops.__dict__,
            "infrastructure": self.infrastructure.__dict__
        }

        os.makedirs(os.path.dirname(self.config_path), exist_ok=True)
        with open(self.config_path, 'w') as f:
            yaml.dump(config, f, default_flow_style=False)

    def to_dict(self) -> Dict[str, Any]:
        """Convert configuration to dictionary"""
        return {
            "model": self.model.__dict__,
            "peft": self.peft.__dict__,
            "training": self.training.__dict__,
            "data": self.data.__dict__,
            "security": self.security.__dict__,
            "mlops": self.mlops.__dict__,
            "infrastructure": self.infrastructure.__dict__
        }
